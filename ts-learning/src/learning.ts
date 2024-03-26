let a = 10;
// a = "10";

// union types
let b: string | number;
b = 10;
b = "ten"


let names = ["john", "johnny"]


// string  or number array
let testStringOrNumberArray: (string | number)[];
testStringOrNumberArray = [1, 10, "hello"]


let testing: string[] | number[];
testing = [1,2,3];
testing = ["mike", "john"]


// Objects
let user = {
    firstname: "John",
    lastName: "Cena",
    age: 40,
    isAdmin: false
}
// user.phone = "123"

let userObj: {
    firstName: string,
    lastname: string,
    isAdmin: boolean,
    phone?: string
}

userObj = {
    firstName: "Glenn",
    lastname: "Maxwell",
    isAdmin: false
}
userObj = {
    firstName: "Glenn",
    lastname: "Maxwell",
    isAdmin: false,
    phone: "123"
}


// Functions
const convertToUpperCase = (data: string) : string => data.toUpperCase()

function convertToLowerCase(data: string): string {
    return data.toLowerCase();
}

// function with optional parameter
const sum = (num1: number, num2: number, num3?: number) => {
    return num3 ? num1 + num2 + num3 : num1 + num2;
}
sum(10, 20);
sum(10, 20, 30);


// TYPE Aliases
type UserType = {
    firstName: string,
    lastName: string,
    isInWwe: boolean,
    country?: string,
    isFamous: "Yes" | "No"
}

const printUser = (user: UserType) => {
    console.log(`${user.firstName} ${user.lastName}`);
}

const getFontColor = (theme: "light" | "dark") => {
    if (theme === "light") {
        return "black"
    } else {
        return "white"
    }
}

getFontColor("light");
// getFontColor("red")



// INTERFACES
interface IUser {
    firstName: string;
    lastName: string;
    phone: string;
    age: number;
}

interface IEmployee extends IUser {
    employeeId: number;
}

const employee: IEmployee = {
    firstName: "mike",
    age: 28,
    phone: "123",
    lastName: "ty",
    employeeId: 123
}

// GENERICS
interface IAuthor {
    userName: string,
    id: number
}

interface ICategory {
    label: string,
    id: number
}

interface IPost<T> {
    id: number;
    title: string;
    description: string;
    extra: T[]
}

const post: IPost<IAuthor> = {
    title: "post title",
    description: "post desc",
    id: 123,
    extra: [{userName: "user1", id: 1}]
}
//
// type PartConquestIncentive = {
//     startDate,
//     endDate,
//     percent
// }
//
// type PeriodConquestIncentive = {
//     startDate,
//     endDate,
//     part,
//     percent
// }
//
// type IncentiveTier = {
//     tierName: string,
//     baselineRange: {startAMount: number, endAMount: number},
//     targetLevels?,
//     loyaltyCap: {percentage: number, maxAmount: number},
//     conquestIncentives: PartConquestIncentive[] | PeriodConquestIncentive[],
//     rewardPayoutOption?
// }

// type IncentiveProgram = {
//     programName: string,
//     programCode: string,
//     programStartDate,
//     programEndDate,
//     rewardStartDate,
//     rewardEndDate,
//     incentiveTiers: IncentiveTier[],
//     status: "new" | "locked" | "inProgress" | "completed" | "rewardOpen" | "programClosed"
// }


export {};


