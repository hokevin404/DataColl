// Part 1: Refactoring Old Code
// When code is outdated or inefficient, it often goes through a process called “refactoring.” Refactoring code is the process of restructuring that code without changing its original behavior.
// For the first part of this assignment, revisit your code from ALAB 308.3.1, wherein you create a script that parsed CSVs. Now that you have knowledge of arrays and objects, how would you change your approach to this problem? Take a few minutes to examine and refactor the code before continuing.

const stringOfCSV = `ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26`;

// let str = ``;
// let myArr = [];
// let counter = 0;

// for(let x of stringOfCSV)
// {
//     switch(x)
//     {
//         case('\n'):
//         {
//             myArr.push(str);
//             str='';
//             counter++;
//             console.log(myArr);
//             myArr = [];
//             break;
//         }
//         case(','):
//         {
//             counter++;
//             myArr.push(str);
//             str = ``;
//             break;
//         }
//         default:
//         {
//             str+=x;
//             counter++;
//             break;
//         }
//     }

//     if(counter === stringOfCSV.length)
//     {
//         myArr.push(str);
//         console.log(myArr);
//     }     
// }


// Part 2: Expanding Functionality
// Now that you are familiar with your code, and perhaps have improved it, it is time to expand upon its functionality.
//
// Begin with the following task:
//  ~ Declare a variable that stores the number of columns in each row of data within the CSV.
//  ~ Instead of hard-coding four columns per row, expand your code to accept any number of columns. This should be calculated dynamically based on the first row of data.
// 
// For example, if the first row of data (the headings) has eight entries, your program should create eight entries per row. You can safely assume that all rows that follow will contain the same number of entries per row.
// 
// After you have implemented the above:
//  ~ Store your results in a two-dimensional array.
//      ~ Each row should be its own array, with individual entries for each column.
//      ~ Each row should be stored in a parent array, with the heading row located at index 0.
//  ~ Cache this two-dimensional array in a variable for later use.
// 
// Using the original CSV example data, here is what the result of this step should look like:

//      ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26
// becomes
//
//     [["ID", "Name", "Occupation", "Age"],
//      ["98", "Bill", "Doctor’s Assistant", "26"]]
//      ["42", "Bruce", "Knight", "41"],
//      ["57", "Bob", "Fry Cook", "19"],
//      ["63", "Blaine", "Quiz Master", "58"],
//      ["98", "Bill", "Doctor’s Assistant", "26"]]

let columns = 0;
let str = ``;
let myArr = [];
let storedArr = [];
let counter = 0;

columns = getColumns(stringOfCSV);
//console.log(columns);

for(let x of stringOfCSV)
{
    switch(x)
    {
        case('\n'):
        {
            myArr.push(str);
            str='';
            counter++;
            // console.log(myArr);
            if(columns >= 0)
            {
                storedArr.push(myArr);
                columns--;
            }
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
        storedArr.push(myArr);
        //console.log(myArr);
    }     
}
// console.log(storedArr);


// Part 3: Transforming Data
// While the data is now much more workable than it was in its string format, there is still a large amount of obscurity in the data itself. When we access an arbitrary index of the results array, it is impossible to know what that data is referring to without additional cross-referencing.
// 
// In order to make it more obvious what the data is, we will transform our rows into objects.
// 
// Implement the following:
//  ~ For each row of data in the result array produced by your code above, create an object where the key of each value is the heading for that value’s column.
//      ~ Convert these keys to all lowercase letters for consistency.
//  ~ Store these objects in an array, in the order that they were originally listed.
//  ~ Since the heading for each column will be stored in the object keys, you do not need to create an object for the heading row itself.
// 
// For instance, the results of the example data above being passed through this step are as follows:
//      [["ID", "Name", "Occupation", "Age"],
//       ["42", "Bruce", "Knight", "41"],
//       ["57", "Bob", "Fry Cook", "19"],
//       ["63", "Blaine", "Quiz Master", "58"],
//       ["98", "Bill", "Doctor’s Assistant", "26"]]
// 
// becomes
//
//      [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" },
//       { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" },
//       { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" },
//       { id: "98", name: "Bill", occupation: "Doctor’s Assistant", age: "26" }]
//
// Important: While this functionality can be built into the original CSV parser you built in Part 2, we are intentionally creating two different algorithms to test different skillsets. Please leave these sections separate even if it would be more efficient to combine them.

let finalArr = [];

columns = getColumns(stringOfCSV);

// Change headings to lower case words
for(let i = 0; i < columns; i++)
    storedArr[0][i] = storedArr[0][i].toLowerCase();

// Assign headings as keys to the values in table
for(let j = 1; j < storedArr.length; j++)
{
    let finalobj = {};
    for(let k = 0; k < columns; k++)
        finalobj[storedArr[0][k]] = storedArr[j][k];
        
    finalArr.push(finalobj);
}
console.log(finalArr);

// FUNCTIONS---------------------------------------------------------------------------------------
function getColumns(arr)
{
    let col = 0;
    for(let char of stringOfCSV)
    {
        if(char === '\n')
        {
            col++;
            break;
        }
        else if(char === ',')
            col++;
    }
    return col;
}