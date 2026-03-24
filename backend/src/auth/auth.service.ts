import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import { generateOtp } from '../utils/otp.util'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async sendOtp(email: string) {

    const otp = generateOtp()

    const hash = await bcrypt.hash(otp, 10)

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await this.prisma.otp_codes.upsert({
      where: { identifier: email },
      update: {
        otp_hash: hash,
        expires_at: expiresAt
      },
      create: {
        identifier: email,
        otp_hash: hash,
        expires_at: expiresAt
      }
    })

    console.log("OTP:", otp)

    return { message: "OTP sent" }
  }

  async verifyOtp(email: string, otp: string) {

    const record = await this.prisma.otp_codes.findUnique({
      where: { identifier: email }
    })

    if (!record) {
      throw new UnauthorizedException("Invalid OTP")
    }

    if (record.expires_at < new Date()) {
      await this.prisma.otp_codes.delete({ where: { identifier: email } })
      throw new UnauthorizedException("OTP expired")
    }

    const valid = await bcrypt.compare(otp, record.otp_hash)

    if (!valid) {
      throw new UnauthorizedException("Invalid OTP")
    }

    await this.prisma.otp_codes.delete({
      where: { identifier: email }
    })

    let user = await this.prisma.users.findUnique({
      where: { email }
    })

    if (!user) {
      user = await this.prisma.users.create({
        data: { email }
      })
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email })

    return {
      message: "Login success",
      user,
      token,
    }
  }

}