import { db } from "./firebase.js"

// generates simple db structure for hyperhyper

const generateDB = () => {

  const batch = db.batch();

  const maps = ['ICS', 'CAMT', 'LoanIQ', 'LuxCIL']
  const objects = [
    {
      OBJ_NAME: 'SV041254',
      OBJ_DESCRIPTION: 'BDC Windows',
      OBJ_ALARMSTATE: 1,
      OBJ_TYPEID: 2,
      OBJTYPE_NAME: "Server"
    },
    {
      OBJ_NAME: 'SV041238',
      OBJ_DESCRIPTION: 'UNIX Windows',
      OBJ_ALARMSTATE: 1,
      OBJ_TYPEID: 2,
      OBJTYPE_NAME: "Server"
    }
  ]

  maps.forEach((m, i) => {

    let mapRef = db.collection("_maps").doc();
    batch.set(mapRef, {
      MAPS_NAME: m,
      alerts: {
        critical: 2,
        major: 0,
        warning: 0,
        minor: 1,
        clear: 3
      }
    });

    objects.forEach(o => {
      let objRef = mapRef.collection('_objects').doc();
      batch.set(objRef, o);
    });

  });

  return batch.commit();

}

export { generateDB };
