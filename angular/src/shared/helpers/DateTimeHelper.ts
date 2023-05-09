export class DateTimeHelper {
    static extractDatetime(dateTime: string): string {
        let date = dateTime.slice(0, 1);
        let ressult = `${dateTime.slice(0, 2)}/${dateTime.slice(2, 4)}/${dateTime.slice(4, 8)}`
        console.log(ressult);

        return ressult;
    }
}
