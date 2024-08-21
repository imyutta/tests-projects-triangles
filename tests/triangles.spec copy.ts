import { test, expect, Page } from "@playwright/test";
import { TrianglePage } from "../page-models/triangle_page";

type TriangleInputValue = string | number;

function generateExpectedResult(
  triangleType: string,
  values: TriangleInputValue[],
  includeValues: boolean = true
): string {
  if (!includeValues) {
    return `${triangleType}`;
  }
  return `${triangleType}Вы ввели:A: ${values[0]}; B: ${values[1]}; C: ${values[2]}`;
}

test("page loads correctly", async ({ page }) => {
  const trianglePage = new TrianglePage(page);
  await trianglePage.goto();
  const expectedTitle = `Puzzles`;
  const actualTitle = await trianglePage.checkTitle();
  await expect(actualTitle).toContain(expectedTitle);
  const inputsVisible = await trianglePage.areInputsVisible();
  await expect(inputsVisible).toBe(true);
});

test.describe("Positive test cases", () => {
  const testCases = [
    {
      values: [5, 5, 8],
      triangleType: `Это равнобедренный треугольник.`,
      description: `triangle is isosceles`,
    },
    {
      values: [5, 5, 5],
      triangleType: `Это равносторонний треугольник.`,
      description: `triangle is equilateral`,
    },
    {
      values: [5, 6, 7],
      triangleType: `Это остроугольный треугольник.`,
      description: `triangle is Acute-angled`,
    },
    {
      values: [2, 4, 5],
      triangleType: `Это тупоугольный треугольник.`,
      description: `triangle is Obtuse angled`,
    },
    {
      values: [3, 4, 5],
      triangleType: `Это прямоугольный треугольник.`,
      description: `triangle is  right`,
    },

    {
      values: [99999, 99999, 99999],
      triangleType: `Это равносторонний треугольник.`,
      description: `handles maximum allowed numbers`,
    },
    {
      values: [1, 1, 1],
      triangleType: `Это равносторонний треугольник.`,
      description: `handles minimum allowed numbers`,
    },
    {
      values: [2.6, 6, 7],
      triangleType: `Это остроугольный треугольник.`,
      description: `input with decimal point in field A`,
    },
    {
      values: ["2,7", 4, 5],
      triangleType: `Это остроугольный треугольник.`,
      description: `input with comma in field A`,
    },
  ];
  testCases.forEach(({ values, triangleType, description }) => {
    test(description, async ({ page }) => {
      const trianglePage = new TrianglePage(page);
      const expectedResult = generateExpectedResult(triangleType, values);
      await trianglePage.inputSubmitCheck(values, expectedResult);
    });
  });
});

test.describe("Negative test cases", () => {
  test.describe("Not a triangle", () => {
    const triandleTypeString = `Это НЕ треугольник.`;
    const testCases = [
      {
        values: [0, 0, 0],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: All inputs are `0`",
      },
      {
        values: [1, 0, 0],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: two zero inputs. B = 0, C = 0",
      },
      {
        values: [0, 1, 0],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: two zero inputs. A = 0, C = 0",
      },
      {
        values: [0, 0, 1],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: two zero inputs. A = 0, B = 0",
      },
      {
        values: [0, 1, 1],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: 1 zero input. A = 0",
      },
      {
        values: [1, 0, 1],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: 1 zero. B = 0",
      },
      {
        values: [1, 1, 0],
        triangleType: triandleTypeString,
        description: "ZERO INPUTS: 1 zero case 3. C = 0",
      },
      {
        values: ["L", 8, 8],
        triangleType: triandleTypeString,
        description: "Invalid input A (letter)",
      },
      {
        values: [8, "L", 8],
        triangleType: triandleTypeString,
        description: "Invalid input B (letter)",
      },
      {
        values: [8, 8, "L"],
        triangleType: triandleTypeString,
        description: "Invalid input C (letter)",
      },
      {
        values: ["-1", 8, 8],
        triangleType: triandleTypeString,
        description: "Invalid input A (negative number)",
      },
      {
        values: [8, "-1", 8],
        triangleType: triandleTypeString,
        description: "Invalid input B (negative number)",
      },
      {
        values: [8, 8, "-1"],
        triangleType: triandleTypeString,
        description: "Invalid input C (negative number)",
      },
      {
        values: [")", 8, 8],
        triangleType: triandleTypeString,
        description: "Invalid input A (symbol)",
      },
      {
        values: [8, ")", 8],
        triangleType: triandleTypeString,
        description: "Invalid input B (symbol)",
      },
      {
        values: [8, 8, ")"],
        triangleType: triandleTypeString,
        description: "Invalid input C (symbol)",
      },
    ];

    testCases.forEach(({ values, triangleType, description }) => {
      test(description, async ({ page }) => {
        const trianglePage = new TrianglePage(page);
        const expectedResult = generateExpectedResult(triangleType, values);
        await trianglePage.inputSubmitCheck(values, expectedResult);
      });
    });
  });

  test.describe("exceeds maximum allowed numbers", () => {
    const expectedResultPartOne = `Числа слишком большие.`;
    const testCases = [
      {
        values: [9999999999, 2, 3],
        triangleType: expectedResultPartOne,
        description: "Exceeds maximum allowed number for side A",
      },
      {
        values: [5, 9999999999, 4],
        triangleType: expectedResultPartOne,
        description: "Exceeds maximum allowed number for side B",
      },
      {
        values: [5, 6, 9999999999],
        triangleType: expectedResultPartOne,
        description: "Exceeds maximum allowed number for side C",
      },
    ];

    testCases.forEach(({ values, triangleType, description }) => {
      test(description, async ({ page }) => {
        const trianglePage = new TrianglePage(page);
        const expectedResult = generateExpectedResult(triangleType, values);
        await trianglePage.inputSubmitCheck(values, expectedResult);
      });
    });
  });

  test.describe("Empty inputs", () => {
    const expectedResultPartOne = `Задайте все стороны.`;
    const testCases = [
      {
        values: ["", 2, 3],
        triangleType: expectedResultPartOne,
        description: "The input for side A is empty",
      },
      {
        values: [5, "", 4],
        triangleType: expectedResultPartOne,
        description: "The input for side B is empty",
      },
      {
        values: [5, 6, ""],
        triangleType: expectedResultPartOne,
        description: "The input for side C is empty",
      },
    ];

    testCases.forEach(({ values, triangleType, description }) => {
      test(description, async ({ page }) => {
        const trianglePage = new TrianglePage(page);
        const expectedResult = generateExpectedResult(
          triangleType,
          values,
          false
        );
        await trianglePage.inputSubmitCheck(values, expectedResult);
      });
    });
  });

  test.describe("One side is bigger than sum of two other sides", () => {
    const expectedResultPartOne = `Одна сторона больше суммы двух других или равна ей.`;
    const testCases = [
      {
        values: [70, 4, 3],
        triangleType: expectedResultPartOne,
        description: "Side A is bigger than B+C",
      },
      {
        values: [3, 70, 4],
        triangleType: expectedResultPartOne,
        description: "Side A is bigger than A+C",
      },
      {
        values: [3, 4, 70],
        triangleType: expectedResultPartOne,
        description: "Side A is bigger than A+B",
      },
    ];

    testCases.forEach(({ values, triangleType, description }) => {
      test(description, async ({ page }) => {
        const trianglePage = new TrianglePage(page);
        const expectedResult = generateExpectedResult(triangleType, values);
        await trianglePage.inputSubmitCheck(values, expectedResult);
      });
    });
  });

  test.describe("SQL injections", () => {
    const expectedResultPartOne = `SQL-инъекции это плохо! Так не получится. :)`;
    const testCases = [
      {
        values: [`SELECT`, 4, 3],
        triangleType: expectedResultPartOne,
        description: "SQL injection in input A (uppercase)",
      },
      {
        values: [3, `SELECT`, 4],
        triangleType: expectedResultPartOne,
        description: "SQL injection in input B (uppercase)",
      },
      {
        values: [3, 4, `SELECT`],
        triangleType: expectedResultPartOne,
        description: "SQL injection in input C (uppercase)",
      },
      {
        values: [`select`, 4, 3],
        triangleType: expectedResultPartOne,
        description: "SQL injection in input A (lowercase)",
      },
      {
        values: [3, `select`, 4],
        triangleType: expectedResultPartOne,
        description: "SQL injection in input B (lowercase)",
      },
      {
        values: [3, 4, `select`],
        triangleType: expectedResultPartOne,
        description: "SQL injection in input C (lowercase)",
      },
    ];

    testCases.forEach(({ values, triangleType, description }) => {
      test(description, async ({ page }) => {
        const trianglePage = new TrianglePage(page);
        const expectedResult = generateExpectedResult(
          triangleType,
          values,
          false
        );
        await trianglePage.inputSubmitCheck(values, expectedResult);
      });
    });
  });

  test.describe("XSS inputs", () => {
    const expectedResultPartOne = `XSS это плохо! Так не получится. :)`;
    const testCases = [
      {
        values: [`<SCRIPT>alert('xss!’)</SCRIPT>`, 4, 3],
        triangleType: expectedResultPartOne,
        description: "XSS injection in input A (uppercase)",
      },
      {
        values: [3, `<SCRIPT>alert('xss!’)</SCRIPT>`, 4],
        triangleType: expectedResultPartOne,
        description: "XSS injection in input B (uppercase)",
      },
      {
        values: [3, 4, `<SCRIPT>alert('xss!’)</SCRIPT>`],
        triangleType: expectedResultPartOne,
        description: "XSS injection in input C (uppercase)",
      },
      {
        values: [`<script>alert('xss!’)</script>`, 4, 3],
        triangleType: expectedResultPartOne,
        description: "XSS injection in input A (lowercase)",
      },
      {
        values: [3, `<script>alert('xss!’)</script>`, 4],
        triangleType: expectedResultPartOne,
        description: "XSS injection in input B (lowercase)",
      },
      {
        values: [3, 4, `<script>alert('xss!’)</script>`],
        triangleType: expectedResultPartOne,
        description: "XSS injection in input C (lowercase)",
      },
    ];

    testCases.forEach(({ values, triangleType, description }) => {
      test(description, async ({ page }) => {
        const trianglePage = new TrianglePage(page);
        const expectedResult = generateExpectedResult(
          triangleType,
          values,
          false
        );
        await trianglePage.inputSubmitCheck(values, expectedResult);
      });
    });
  });
});

// TODO: this is how describes should look like
// test.describe(('new describe', () => {
//     let model: TrianglePage
//     test.beforeEach(({ page}) => {
//         model = new TrianglePage(page)
//         model.goto()
//     })

//     test('test1', () => {
//         model
//     })
// }))
