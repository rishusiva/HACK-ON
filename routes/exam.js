const Router = require("express").Router();

let exam1 = {
  title: "The Basics of C Language",
  questions: [
    {
      title: "Who invented C Language?",
      options: ["Charles Babbage", "Grahambel", "Dennis Ritchie", "Steve Jobs"],
      correct: "Dennis Ritchie",
    },
    {
      title: "C Language is a successor to which language?",
      options: ["FORTRAN", "D Language", "BASIC", "B Language"],
      correct: "B Language",
    },
    {
      title: "C is a which level language?",
      options: ["High + Low", "High", "Low", "None"],
      correct: "High",
    },
    {
      title: "C language was invented to develop which Operating System?",
      options: ["Android", "Linux", "Ubuntu", "Unix"],
      correct: "Unix",
    },
    {
      title: "What is required in each C program? ",
      options: [
        "The program must have at least one function.",
        "The program does not require any function.",
        "Input data",
        "Output data",
      ],
      correct: "The program must have at least one function.",
    },
    {
      title: "C Language is a successor to which language?",
      options: ["FORTRAN", "D Language", "BASIC", "B Language"],
      correct: "B Language",
    },
    {
      title: "What is a lint?",
      options: ["C compiler", "Interactive debugger", "Analyzing tool", "C interpreter"],
      correct: "Analyzing tool",
    },
    {
      title: "Why is a macro used in place of a function?",
      options: [
        "It reduces execution time.",
        "It reduces code size.",
        "It increases execution time.",
        "It increases code size.",
      ],
      correct: "It reduces code size.",
    },
  ],
};
let exam2 = {
  title: "Loops",
  questions: [
    {
      title: "Choose a right C Statement.",
      options: [
        "Loops or Repetition block executes a group of statements repeatedly.",
        "Loop is usually executed as long as a condition is met.",
        "Loops usually take advantage of Loop Counter.",
        "All the above.",
      ],
      correct: "All of the above",
    },
    {
      title: "Loops in C Language are implemented using?",
      options: ["While Block", "For Block", "Do While Block", "All of the above"],
      correct: "All of the above",
    },
    {
      title: "Which loop is faster in C Language, for, while or Do While?",
      options: ["for", "while", "Do While", "All work at the same speed"],
      correct: "All work at the same speed",
    },
    {
      title: "What is the way to suddenly come out of or Quit any Loop in C Language?",
      options: [
        "continue; statement",
        "break; statement",
        "leave; statement",
        "quit; statement",
      ],
      correct: "break; statement",
    },
    {
      title: "Choose a correct C Statement.",
      options: [
        "a++ is (a=a+1) POST INCREMENT Operator",
        "a-- is (a=a-1) POST DECREMENT Opeartor --a is (a=a-1) PRE DECREMENT Opeator",
        "++a is (a=a+1) PRE INCRMENT Operator",
        "All of the above.",
      ],
      correct: "All of the above",
    },
    {
      title: "Choose correct Syntax for C Arithmetic Compound Assignment Operators.",
      options: [
        "a+=b is (a= a+ b) a-=b is (a= a-b)",
        "a*=b is (a=a*b) a/=b is (a = a/b)",
        "a%=b is (a=a%b)",
        "All of the above.",
      ],
      correct: "All of the above",
    },
  ],
};
let exam3 = {
  title: "Arrays and Pointers",
  questions: [
    {
      title: "What is an array in C Language?",
      options: [
        "A group of elements which may or may not have the same data type",
        "An array contains more than one element of different data type",
        "Array elements are stored in memory in continuous or contiguous locations",
        "All the above",
      ],
      correct:
        "Array elements are stored in memory in continuous or contiguous locations",
    },
    {
      title: "Choose a correct statement about arrays in C Language",
      options: [
        "An array address is the address of first element of array itself",
        "An array size must be declared if not initialized immediately",
        "Array size is the sum of sizes of all elements of the array",
        "All the above",
      ],
      correct: "All the above",
    },
    {
      title: "What are the types of Arrays?",
      options: [
        "int, long, float, double",
        "num, string",
        "alpha, digit",
        "All the above",
      ],
      correct: "int, long, float, double",
    },
    {
      title: "An array Index starts with?",
      options: ["-1", "0", "1", "2"],
      correct: "0",
    },
    {
      title: "What passes an entire array to a called function?",
      options: [
        "Call by value",
        "Call by reference",
        "Address relocation",
        "Address restructure",
      ],
      correct: "Call by reference",
    },
    {
      title: "Choose a correct statement",
      options: [
        "An array size can not changed once it is created",
        "Array element value can be changed any number of times",
        "To access Nth element of an array students, use students[n-1] as the starting index is 0",
        "All the above",
      ],
      correct: "All the above",
    },
    {
      title:
        "What is the output of this C Program? int a[]; a[4] = {1,2,3,4}; printf('%d', a[0]);",
      options: ["1", "2", "4", "Compiler error"],
      correct: "1",
    },
    {
      title:
        "What is the output of this C Program? int a[] = {1,2,3,4}; int b[4] = {5,6,7,8}; printf('%d,%d', a[0]+b[3]);",
      options: ["0", "9", "Garbage Value", "Compiler error"],
      correct: "9",
    },
  ],
};

module.exports = { exam1, exam2, exam3 };
