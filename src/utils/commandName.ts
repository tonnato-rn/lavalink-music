import { basename } from "path"

export default (filepath: string) => {
    const filename = basename(filepath);
    return filename.split(".")[0];
}