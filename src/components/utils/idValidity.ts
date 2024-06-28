export const idValidity = (grade: string): number => {
  // Define the mapping for grades to numerical values
  const gradeMapping: { [key: string]: number } = {
    NSY: 1,
    KD1: 1,
    KD2: 1,
    G1: 2,
    G2: 3,
    G3: 4,
    G4: 5,
    G5: 6,
    G6: 7,
    G7: 8,
    G8: 9,
    G9: 10,
    G10: 11,
    G11: 12,
    G12: 13,
  };

  // Determine the graduation grade based on the current grade
  let graduationGrade: number = 0;
  if (grade in gradeMapping) {
    const currentGradeValue = gradeMapping[grade];
    if (currentGradeValue <= 1) {
      graduationGrade = 1; // Valid until K2
    } else if (currentGradeValue <= 7) {
      graduationGrade = 7; // Valid until Grade 6
    } else if (currentGradeValue <= 10) {
      graduationGrade = 10; // Valid until Grade 9
    } else if (currentGradeValue <= 13) {
      graduationGrade = 13; // Valid until Grade 12
    }

    // Calculate the number of years until graduation
    return graduationGrade - currentGradeValue;
  }

  return -1;
};
