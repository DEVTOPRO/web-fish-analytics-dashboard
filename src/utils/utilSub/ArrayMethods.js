export const uniqueDatasetFilter = (data, filterValue) => {
    const arrayUniqueByKey = [
      ...new Map(data.map(item => [item[filterValue], item])).values(),
    ];
    return arrayUniqueByKey;
  };


export const duplicateFilter=(data,key1,key2,key3)=>{
let objectColl=[];
data.map((val,index)=>{
    data.find((sam,ind)=>{
      if(key2!=""){
        if(index!==ind &&val[key2]===sam[key2]&&val[key1]===sam[key1]){
          objectColl.push(sam);
          }
      }else{
        if(index!==ind&&val[key1]===sam[key1]){
          objectColl.push(sam);
          }
      } 
    });
});
console.log("objectColl",objectColl)
let finalArray=[]
if(key3==="employeeName"){
  finalArray= objectColl.length==0?data.length<=1?[...data]:[]:[...new Set(objectColl)];
}else{
  finalArray=objectColl.length>=2?[...new Set(objectColl)]:[]
}
return finalArray;
}
export const duplicateRemove=(data,referArr)=>{
  let intialArr=[...data]
  referArr.length>0&&referArr.map((indVal)=>{
    intialArr.splice(intialArr.findIndex((val)=>val.id===indVal.id),1);
  });
  return intialArr;
}
export const getNonDuplicatesComapny=(data,referInd)=>{
let nonDuplicate=[];
referInd.length>0&&referInd.map((valData)=>{
  nonDuplicate.push(data.find((val)=>val.id!==valData.id))
});
let finalArray=nonDuplicate.length>0?[...new Set(nonDuplicate)]:[];
return finalArray
}
export const searchByKeyword = (listOfItems,field,searchKey,objectName) => {
  if (typeof searchKey !== 'string' || searchKey.length === 0) {
    return listOfItems;
  }
  if (["Active","active"].includes(searchKey)) {
      return listOfItems.filter(value => value.status == "Active");
  } else {
    let searchLower = searchKey.toLowerCase();
    let filteredItems = new Array();
    listOfItems.map(item => {
      if (objectName && typeof field == 'string' &&
        item[objectName][field].toLowerCase().includes(searchLower)
      ) {
        filteredItems.push(item);
      }
      if (!objectName && typeof field == 'string' &&
        item[field].toLowerCase().includes(searchLower)
      ) {
        filteredItems.push(item);
      }
      Array.isArray(field) &&
        field.map(test => {
          if (item[test] && (item[test].toString()).toLowerCase().includes(searchLower)) {
            filteredItems.push(item);
          }
        });
    });
    return Array.from(new Set(filteredItems));
  }
};


export const timeOutCaller=(stateFunction,time)=>{
  setTimeout(()=>{
    stateFunction(null)
  },time?time:2500)
} 