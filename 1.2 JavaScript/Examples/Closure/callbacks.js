function ajax(url, callback) {
  console.log(`getting data from ${url}...`);
  setTimeout(() => {
    callback({ name: "Frank" });
  }, 1000);
}

function lookupStudentRecord(studentID) {
  ajax(`https://some.api/student/${studentID}`, function onRecord(record) {
    console.log(`${record.name} (${studentID})`);
  });
}
lookupStudentRecord(114);
// Frank (114)
