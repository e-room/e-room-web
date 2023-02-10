export default (formValue) => {
  const traffic = formValue.reviewScoreDto.traffic;
  const buildingComplex = formValue.reviewScoreDto.buildingComplex;
  const surrounding = formValue.reviewScoreDto.surrounding;
  const internal = formValue.reviewScoreDto.internal;
  const livingLocation = formValue.reviewScoreDto.livingLocation;

  const totalScore =
    (traffic + buildingComplex + surrounding + internal + livingLocation) / 5;

  return totalScore;
};
