import path from "node:path";

const r = (p: string) => path.resolve(__dirname, "..", p);

export const aliases = {
  "@api": r("src/api-services"),
  "@services": r("src/services"),
  "@images": r("src/assets/images"),
  "@scss": r("src/assets/scss"),
  "@components": r("src/components"),
  "@context": r("src/context"),
  "@helpers": r("src/helpers"),
  "@pages": r("src/pages"),
  "@routes": r("src/routes"),
  "@store": r("src/store"),
  "@tests": r("src/tests"),
  "@utils": r("src/utils"),
  "@hooks": r("src/hooks"),
  "@validations": r("src/validations"),
  "@translations": r("translations"),
};
