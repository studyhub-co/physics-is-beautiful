export const useCurrentMaterialHasType = (currentMaterial) => {
  if (
    currentMaterial &&
    currentMaterial.hasOwnProperty('material_problem_type') && // show only if a full version of material loaded
    currentMaterial.material_problem_type
  ) {
    return true
  } else {
    return false
  }
}

export const useMaterialTypePropIsInMaterial = (currentMaterial) => {
  // this mean we have no material loaded, need to wait for Material Type
  return (
    currentMaterial &&
    currentMaterial.hasOwnProperty('material_problem_type')
  )
}

export const useHandleMaterialDroppedBefore = (materialUuid, beforeMaterialUuid, moveMaterial) => {
  moveMaterial(materialUuid, beforeMaterialUuid)
}
