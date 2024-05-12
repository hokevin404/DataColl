// Part 1: Refactoring Old Code
// When code is outdated or inefficient, it often goes through a process called “refactoring.” Refactoring code is the process of restructuring that code without changing its original behavior.
// For the first part of this assignment, revisit your code from ALAB 308.3.1, wherein you create a script that parsed CSVs. Now that you have knowledge of arrays and objects, how would you change your approach to this problem? Take a few minutes to examine and refactor the code before continuing.

const stringOfCSV = `Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232`;

let str = ``;
let myArr = [];
let counter = 0;

for(let x of stringOfCSV)
{
    switch(x)
    {
        case('\n'):
        {
            myArr.push(str);
            str='';
            counter++;
            console.log(myArr);
            myArr = [];
            break;
        }
        case(','):
        {
            counter++;
            myArr.push(str);
            str = ``;
            break;
        }
        default:
        {
            str+=x;
            counter++;
            break;
        }
    }
    
    if(counter === stringOfCSV.length)
    {
        myArr.push(str);
        console.log(myArr);
    }     
}