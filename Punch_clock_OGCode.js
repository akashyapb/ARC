function doGet() {
  return HtmlService.createHtmlOutputFromFile("form.html")  
}
empid = [""]
locationid = [""]
subjectid = [""]
vcode = [""]
subjects = ["ARCH","BIOL","BUS","BUS","BME","CAE","CHE","CHEM","CS","ECE","ITM","MATH 100 and 200","MATH 300 and 400","MMAE","PHYS","MONITOR","MATLAB","SSCI AND PS","CS 100 and 300","CS 400 and 500"];
locations = ["Galvin UL","Galvin LL","WH119","Online"];

function clockInOut(payload){
  if(empid.includes(payload.empid && locationid.includes(payload.locationid) && subjectid.includes(payload.subjectid) && vcode.includes(payload.vcode)))
  {
    throw new Error("uh-oh, Enter Inputs.") 
  }
  if(!["Clock In", "Clock Out"].includes(payload.action))
  {
    throw new Error("uh-oh, Invalid Scholar ID or Verification Code.")
  }
  console.log(payload)
  
  if(!subjects.includes(payload.subjectid) || !locations.includes(payload.locationid)){
    throw new Error("uh-oh, Select valid subject/location.") 
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const wsData = ss.getSheetByName("Data")
  const wsEmployees = ss.getSheetByName("Employees")
  const employeeData = wsEmployees.getRange(2,1,wsEmployees.getLastRow()-1,2).getValues()
  const matchingEmployees = employeeData.filter(r => r[0].toString() === payload.empid && r[1].toString() === payload.vcode)
  if(matchingEmployees.length !== 1){
    throw new Error("uh-oh, Invalid Scholar ID or Verification Code.") 
  }
  const clockInStatuses = wsData.getRange(2,2,wsData.getLastRow()-1,6).getValues()
  var sheetRow = 2;
  var clockedInStatus = clockInStatuses.filter(ele=> payload.action =="Clock Out" 
    && ele[1] == payload.empid && ele[0] == "Clock In" && ele[5] == "Live");
  if(payload.action =="Clock Out" && clockedInStatus==""){
   throw new Error("uh-oh, please clock in before you clock out")
   }  
  clockInStatuses.forEach(ele=>{
  if(ele[1]==payload.empid && ele[0]=="Clock In" && ele[5]=="Live"){
    if(payload.action == "Clock In"){
      console.log("clock in error");
      throw new Error("uh-oh, please clock out subject - "+ ele[4] +" before you clock In again!")
    }else{
      if(ele[4]!=payload.subjectid){
        throw new Error("uh-oh, please clock out subject - "+ ele[4])
      }else{
        wsData.getRange(sheetRow,7,1,1).setValue('Done')
      }
    }
  }
  sheetRow++
});
 console.log("Passed")
 wsData.appendRow([new Date(),payload.action, payload.empid, payload.vcode, 
  payload.locationid, payload.subjectid,payload.action=="Clock In"?"Live":"Done"])
}