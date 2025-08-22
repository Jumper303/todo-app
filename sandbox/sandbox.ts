
// const urls: string[] = ['https://www.index.hu', 'https://www.telex.hu'];

// function getAll(urls: string[]) {
//     return Promise.all(
//         urls.map(async url => {
//             const resp = await fetch(url);
//             return resp;
//         })
//     )
// }

// getAll(urls).then(
//     (resps) => {
//         resps.map((resp) => {
//             console.log(`${resp.url} ${resp.status}`);
//         });
//     }
// );

// const generateLotteryNumbers = (): number[] => {
//     const numbers: Set<number> = new Set();
//     while (numbers.size < 5) {
//         const number = Math.floor(Math.random() * (90 - 1) + 1);
//         numbers.add(number);
//     }
//     return Array.from(numbers).sort((a, b) => a - b);
// }

// console.log(generateLotteryNumbers());
    



// type Pet = {
//     name: string;
//     walk: () => void;
//   };
  
//   type Fish = {
//     name: string;
//     swim: () => void;
//   };
  
//   const myPet: Pet | Fish = { name: 'Goldie', swim: () => console.log('Swimming') };
  
//   (myPet as Fish).swim();


// let a;
// console.log(typeof a);

// enum Status {
//     Active,
//     Inactive
// }

// // const e: Status = Status.Active;

// console.log(typeof Status);


// function greet(firstName?: string, lastName: string = "Doe"): string {
//     return `Hello, ${firstName} - ${lastName}`;
// }

// console.log(greet(undefined, "John"));



// const sum: (x: number, y: number) => number = (x, y) => x + y;
// console.log(typeof sum);


let firstObject = {age: 30, name: "John", job: "Developer", id: 1};
let secondObject = {name: "John", age: 31, address: "Home", id: "1"};

interface Difference {
    key: string;
    value1: any;
    value2: any;
}

function compareObjects(obj1: any, obj2: any): Difference[] {
    let differences: Difference[] = [];
    let differenceKeys: string[] = [];
    Object.entries(obj1).forEach(([key, value]) => {
        if (obj1[key] !== obj2[key]) {
            if (!differenceKeys.includes(key)) {
                differences.push({ key, value1: obj1[key], value2: obj2[key] });
                differenceKeys.push(key);
            }
        }
    });

    Object.entries(obj2).forEach(([key, value]) => {
        if (obj2[key] !== obj1[key]) {
            if (!differenceKeys.includes(key)) {
                differences.push({ key, value1: obj1[key], value2: obj2[key] });
                differenceKeys.push(key);
            }
        }
    });
    return differences;
}

console.log(compareObjects(firstObject, secondObject));
