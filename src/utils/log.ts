function getDate() {
    const date = new Date();
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
}

export default (text: string, type?: string) => console.log(`\u001b[36m[${type || "LOG"} ${getDate()}]\u001b[0m`, text);
export const error = (text: string | Error, type?: string, exit?: boolean) => {
    console.log(`\u001b[31m[${type || "ERROR"} ${getDate()}]\u001b[0m`, text);
    if (exit) process.exit(1);
}