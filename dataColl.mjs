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

// Get number of columns from index 0
columns = getColumns(stringOfCSV);

// Loop through CSV string by character
for(let x of stringOfCSV)
{
    // Switch statement for each char encountered
    switch(x)
    {
        // When new-line char encountered:
        //  1) add word to temp array
        //  2) re-initialize variable str to empty
        //  3) increment counter to keep track how far long into CSV string
        //  4) if the cell's column is not greater than total columns of table:
        //      4a) push to final array
        //      4b) decrement columns value to keep track of cell's column
        //  5) re-initialize temp array to empty
        //  6) break to next loop iteration
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
        // When comma char encountered:
        // 1) increment counter to keep track how far long into CSV string
        // 2) add word to temp array
        // 3) re-initialize variable str to empty
        // 4) break to next loop iteration
        case(','):
        {
            counter++;
            myArr.push(str);
            str = ``;
            break;
        }
        // When encountering other char that is not a comma or new-line char:
        // 1) add letter to str variable
        // 2) increment counter to keep track how far long into CSV string
        // 3) break to next loop iteration
        default:
        {
            str+=x;
            counter++;
            break;
        }
    }

    // If counter (how far along csv string) is equal to the length of CSV length
    // Add word to temp array
    // Add temp array to final array
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
    // Initialize a temp obj
    let finalobj = {};

    // For loop to go through each object of the index
    // add key headings from index 0 to each value of table  
    for(let k = 0; k < columns; k++)
        finalobj[storedArr[0][k]] = storedArr[j][k];
    
    // Push temp obj holding key:value pairs to final arry 
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

// Part 4: Sorting and Manipulating Data
// It is important to know how to work with data in this format, an array of objects, as it is one of the most commonly used data formats in JavaScript.
//
// Using array methods, accomplish the following tasks, in order upon the result of Part 3:
//  ~ Remove the last element from the sorted array.
//  ~ Insert the following object at index 1:
//      ~ { id: "48", name: "Barry", occupation: "Runner", age: "25" }
//  ~ Add the following object to the end of the array:
//      ~ { id: "7", name: "Bilbo", occupation: "None", age: "111" }
// 
// So far, the results should look like this:
//      [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" },
//       { id: "48", name: "Barry", occupation: "Runner", age: "25" },
//       { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" },
//       { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" },
//       { id: "7", name: "Bilbo", occupation: "None", age: "111" }]
// 
// Finally, use the values of each object within the array and the array’s length property to calculate the average age of the group. This calculation should be accomplished using a loop.

//  ~ Remove the last element from the sorted array.
finalArr.pop();
console.log(finalArr);

//  ~ Insert the following object at index 1:
//      ~ { id: "48", name: "Barry", occupation: "Runner", age: "25" }
let objToAdd = { id: "48", name: "Barry", occupation: "Runner", age: "25" };
finalArr.splice(1, 0, objToAdd);
console.log(finalArr);

//  ~ Add the following object to the end of the array:
//      ~ { id: "7", name: "Bilbo", occupation: "None", age: "111" }
let objToAddAtEnd = { id: "7", name: "Bilbo", occupation: "None", age: "111" };
finalArr.push(objToAddAtEnd);
console.log(finalArr);

