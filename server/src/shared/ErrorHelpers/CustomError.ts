export class CustomError {
    public message?: string;
    [key: string]: any;

    constructor(message: string);
    constructor(data: object);

    constructor(data: object | string) {

        console.log(typeof data == "string");

        if (typeof data == "object") {
            for (var i in Object(data)) {
                this[i] = Object(data)[i];
            }
        } else if (typeof data == "string") {
            this.message = data.toString();
        }
    }

    // constructor(message: string, data: object) {
    //     this.message = message;

    //     for (var i in data) {
    //         this[i] = data;
    //     }
    // }


}