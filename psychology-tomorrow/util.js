exports.imageNameForTherapist = function (therapistName) {
  return therapistName.replace(/ /gm,'-').toLowerCase() + ".jpg";
}
