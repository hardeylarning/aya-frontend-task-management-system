export class Task {
    constructor(
        public id: string,
        public name: string,
        public status: string,
        public isCompleted: boolean,
        public userId: string
    ){}
}
