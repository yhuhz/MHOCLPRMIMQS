(globalThis["webpackChunkmhoclprmimqs"]=globalThis["webpackChunkmhoclprmimqs"]||[]).push([[996],{662:(e,a,t)=>{"use strict";t.d(a,{A:()=>m});var s=t(1347);function d(e,a,t,d,l,o){const n=(0,s.g2)("q-card"),c=(0,s.g2)("q-dialog");return(0,s.uX)(),(0,s.CE)("div",null,[(0,s.bF)(c,{modelValue:d.DialogState,"onUpdate:modelValue":a[0]||(a[0]=e=>d.DialogState=e)},{default:(0,s.k6)((()=>[(0,s.bF)(n,{flat:"",class:"text-center q-pa-md dialog-card"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",null,[((0,s.uX)(),(0,s.Wv)((0,s.$y)(d.component)))])])),_:1})])),_:1},8,["modelValue"])])}var l=t(4187),o=t(6091);const n={props:{params:Object,content:Object},setup(e){let a=(0,l.lW)(e,"params"),t=(0,l.lW)(e,"content");return{parameter:a,component:t,DialogState:o.O}}};var c=t(2968),i=t(45),u=t(3341),r=t(272),p=t.n(r);const h=(0,c.A)(n,[["render",d]]),m=h;p()(n,"components",{QDialog:i.A,QCard:u.A})},834:(e,a,t)=>{"use strict";t.d(a,{A:()=>A});var s=t(1347);const d={class:"width-300"},l={class:"flex justify-around q-mt-md"};function o(e,a,t,o,n,c){const i=(0,s.g2)("q-icon"),u=(0,s.g2)("q-btn");return(0,s.uX)(),(0,s.CE)("div",d,[(0,s.bF)(i,{name:"eva-trash-2-outline",size:"100px",color:"negative"}),a[0]||(a[0]=(0,s.Lk)("h6",{class:"text-negative no-margin"},"Are you sure?",-1)),a[1]||(a[1]=(0,s.Lk)("p",{class:"text-dark m-width-250"},"Do you really want to delete this record?",-1)),(0,s.Lk)("div",l,[(0,s.bF)(u,{onClick:o.closeDialog,label:"Cancel","no-caps":"",color:"grey-7",class:"button-100"},null,8,["onClick"]),(0,s.bF)(u,{color:"negative",label:"Yes","no-caps":"",class:"button-100",onClick:o.deleteRecord},null,8,["onClick"])])])}var n=t(6091),c=t(7370),i=t(2222),u=t(455),r=t(3022);const p={setup(){const e=(0,u.rd)(),a=(0,u.lq)(),t=(0,r.A)(),s=()=>{(0,n.o)()},d=()=>{(0,c.pf)({record_id:i.K.value.id},i.K.value.department).then((s=>{(0,n.o)();let d="success"===s.status?0:1;t.notify({type:0===d?"positive":"negative",classes:"text-white",message:0===d?"Patient record deleted successfully":"Failed to delete patient record"}),d||e.push({name:"patient-details",id:a.params.id})}))};return{closeDialog:s,deleteRecord:d}}};var h=t(2968),m=t(3933),v=t(1244),g=t(272),P=t.n(g);const _=(0,h.A)(p,[["render",o]]),A=_;P()(p,"components",{QIcon:m.A,QBtn:v.A})},1408:(e,a,t)=>{"use strict";t.d(a,{AI:()=>P,OE:()=>c,Rw:()=>g,SC:()=>i,Zj:()=>_,dy:()=>m,jU:()=>o,qi:()=>v,sb:()=>u,t0:()=>p,tX:()=>h,y2:()=>n});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.tB)(l),n=(0,d.KR)([]),c=(0,d.KR)([]),i=(0,d.KR)([]),u=(0,d.KR)([]),r="http://localhost/MHOCLPRMIMQS PHP/Patients and Household/patient_api.php",p=e=>new Promise(((a,t)=>{s.A.get(r,{params:{payload:e}}).then((t=>{console.log(t.data),"undefined"!=typeof e.pwd?c.value=t.data.data:"undefined"!=typeof e.sc?i.value=t.data.data:"undefined"!=typeof e.prenatal?u.value=t.data.data:l.value=t.data.data,a(t.data)})).catch((e=>{t(e)}))})),h=e=>new Promise(((a,t)=>{s.A.get(r,{params:{payload:e}}).then((e=>{n.value=e.data.data[0],a(e.data)})).catch((e=>{t(e)}))})),m=e=>new Promise(((a,t)=>{s.A.get(r,{params:{payload:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),v=e=>new Promise(((a,t)=>{s.A.get(r,{params:{payload:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),g=e=>new Promise(((a,t)=>{s.A.post(r,e).then((e=>{console.log(e.data),"success"===e.data.status||console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),P=e=>new Promise(((a,t)=>{s.A.put(r,e).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.patient_id===e.personal_info.patient_id));l.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),_=e=>new Promise(((a,t)=>{s.A.delete(r+"?patient_id="+e.patient_id).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.patient_id===e.patient_id));-1!==a&&l.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))}))},2222:(e,a,t)=>{"use strict";t.d(a,{K:()=>d,b:()=>l});var s=t(4187);let d=(0,s.KR)(null);const l=(e,a)=>{d.value={id:e,department:a}}},2483:(e,a,t)=>{"use strict";t.d(a,{FQ:()=>u,Mw:()=>l,U7:()=>c,W$:()=>n,XP:()=>o});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.KR)([]),n=(0,d.KR)([]),c=(0,d.KR)([]),i="http://localhost/MHOCLPRMIMQS PHP/Reports/reports_api.php",u=(e,a)=>new Promise(((t,d)=>{s.A.get(i,{params:{date_filter:e,mode:a}}).then((e=>{console.log(e.data),"Patient"===a?(l.value=e.data.data,c.value=e.data.date):"Medicine"===a?(o.value=e.data.data,c.value=e.data.date):"Supply"===a&&(n.value=e.data.data,c.value=e.data.date),t(e.data)})).catch((e=>{d(e)}))}))},3271:(e,a,t)=>{"use strict";t.d(a,{A:()=>A});var s=t(1347);const d={class:"width-300"},l={class:"flex justify-around q-mt-md"};function o(e,a,t,o,n,c){const i=(0,s.g2)("q-icon"),u=(0,s.g2)("q-btn");return(0,s.uX)(),(0,s.CE)("div",d,[(0,s.bF)(i,{name:"eva-trash-2-outline",size:"100px",color:"negative"}),a[0]||(a[0]=(0,s.Lk)("h6",{class:"text-negative no-margin"},"Are you sure?",-1)),a[1]||(a[1]=(0,s.Lk)("p",{class:"text-dark m-width-250"},"Do you really want to delete this record?",-1)),(0,s.Lk)("div",l,[(0,s.bF)(u,{onClick:o.closeDialog,label:"Cancel","no-caps":"",color:"grey-7",class:"button-100"},null,8,["onClick"]),(0,s.bF)(u,{color:"negative",label:"Yes","no-caps":"",class:"button-100",onClick:o.deleteSupplyRecord},null,8,["onClick"])])])}var n=t(6091),c=t(2222),i=t(9077),u=t(3022),r=t(8564);const p={setup(){const e=(0,u.A)(),a=()=>{(0,n.o)()},t=()=>{r.A.show(),c.K.value.id.supply_release_id?(0,i._t)({supply_release_id:c.K.value.id.supply_release_id}).then((a=>{r.A.hide();let t="success"===a.status?0:1;e.notify({type:0===t?"positive":"negative",classes:"text-white",message:0===t?"Supply release record deleted successfully":"Failed to delete supply release record"}),(0,i.vz)(c.K.value.id.supply_id),(0,n.o)()})):(0,i.nH)({supply_id:c.K.value.id}).then((a=>{r.A.hide();let t="success"===a.status?0:1;e.notify({type:0===t?"positive":"negative",classes:"text-white",message:0===t?"Supply record deleted successfully":"Failed to delete supply record"}),(0,n.o)()}))};return{closeDialog:a,deleteSupplyRecord:t}}};var h=t(2968),m=t(3933),v=t(1244),g=t(272),P=t.n(g);const _=(0,h.A)(p,[["render",o]]),A=_;P()(p,"components",{QIcon:m.A,QBtn:v.A})},3546:(e,a,t)=>{"use strict";t.d(a,{Pv:()=>n});t(939),t(4520);var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=((0,d.tB)(l),"http://localhost/MHOCLPRMIMQS PHP/Users and Departments/manage_user_api.php"),n=e=>new Promise(((a,t)=>{s.A.get(o,{params:{user_id:e}}).then((e=>{"success"===e.data.status&&(l.value=e.data.data),a(e.data)})).catch((e=>{t(e)}))}))},4202:(e,a,t)=>{"use strict";t.d(a,{AU:()=>R,B8:()=>w,Gv:()=>l,KN:()=>i,Kv:()=>c,M4:()=>y,Mj:()=>r,Nn:()=>m,Uo:()=>o,Vp:()=>g,XO:()=>h,ao:()=>P,bJ:()=>_,d1:()=>v,hh:()=>M,i:()=>p,rf:()=>A,wW:()=>f,xi:()=>n});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.tB)(l),n=(0,d.KR)([]),c=(0,d.KR)([]),i=(0,d.KR)([]),u="http://localhost/MHOCLPRMIMQS PHP/Medicine and Supplies/medicine_inventory_api.php",r=e=>new Promise(((a,t)=>{s.A.get(u,{params:{payload:e}}).then((e=>{"success"===e.data.status?l.value=e.data.data:console.log(e.data.data),a(e.data)})).catch((e=>{t(e)}))})),p=e=>new Promise(((a,t)=>{s.A.get(u,{params:{medicine_id:e}}).then((e=>{n.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),h=e=>new Promise(((a,t)=>{s.A.get(u,{params:{medicine_name:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),m=e=>new Promise(((a,t)=>{s.A.get(u,{params:{medicine_name:e,for_release:!0}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),v=e=>new Promise(((a,t)=>{s.A.get(u,{params:{release_filter:e}}).then((e=>{c.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),g=e=>new Promise(((a,t)=>{s.A.get(u,{params:{patient_id:e}}).then((e=>{i.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),P=e=>new Promise(((a,t)=>{s.A.post(u,e).then((e=>{if(console.log(e.data),"success"===e.data.status)try{l.value.push(e.data.data)}catch(a){l.value=[],l.value.push(e.data.data)}a(e.data)})).catch((e=>{t(e)}))})),_=e=>new Promise(((a,t)=>{s.A.post(u,e).then((e=>{if("success"===e.data.status)try{c.value.push(e.data.data)}catch(a){c.value=[],c.value.push(e.data.data)}else console.log(e.data);a(e.data)})).catch((e=>{t(e)}))})),A=e=>new Promise(((a,t)=>{s.A.post(u,e).then((e=>{"success"===e.data.status||console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),w=e=>new Promise(((a,t)=>{s.A.put(u,e).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.medicine_id===e.medicine_id));l.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),y=e=>new Promise(((a,t)=>{s.A.put(u,e).then((t=>{if("success"===t.data.status){let a=c.value.findIndex((a=>a.med_release_id===e.med_release_id));c.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),f=e=>new Promise(((a,t)=>{s.A.put(u,e).then((e=>{console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),R=e=>new Promise(((a,t)=>{s.A.delete(u+"?medicine_id="+e.medicine_id).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.medicine_id===e.medicine_id));-1!==a&&l.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),M=e=>new Promise(((a,t)=>{s.A.delete(u+"?med_release_id="+e.med_release_id).then((t=>{if("success"===t.data.status){let a=c.value.findIndex((a=>a.med_release_id===e.med_release_id));-1!==a&&c.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))}))},4650:(e,a,t)=>{"use strict";t.d(a,{A:()=>_});var s=t(1347);const d={class:"width-300"},l={class:"flex justify-around q-mt-md"};function o(e,a,t,o,n,c){const i=(0,s.g2)("q-icon"),u=(0,s.g2)("q-btn");return(0,s.uX)(),(0,s.CE)("div",d,[(0,s.bF)(i,{name:"event_busy",size:"100px",color:"negative"}),a[0]||(a[0]=(0,s.Lk)("h6",{class:"text-negative no-margin"},"Are you sure?",-1)),a[1]||(a[1]=(0,s.Lk)("p",{class:"text-dark m-width-250"},"Do you want to declare the patient as deceased?",-1)),(0,s.Lk)("div",l,[(0,s.bF)(u,{onClick:o.closeDialog,label:"Cancel","no-caps":"",color:"grey-7",class:"button-100"},null,8,["onClick"]),(0,s.bF)(u,{color:"negative",label:"Yes","no-caps":"",class:"button-100",onClick:o.deletePatientRecord},null,8,["onClick"])])])}var n=t(6091),c=t(2222),i=t(1408),u=t(3022);const r={setup(){const e=(0,u.A)(),a=()=>{(0,n.o)()},t=()=>{(0,i.Zj)({patient_id:c.K.value.id}).then((a=>{let t="success"===a.status?0:1;e.notify({type:0===t?"positive":"negative",classes:"text-white",message:0===t?"Patient declared deceased":"Failed to declare patient as deceased"}),(0,n.o)()}))};return{closeDialog:a,deletePatientRecord:t}}};var p=t(2968),h=t(3933),m=t(1244),v=t(272),g=t.n(v);const P=(0,p.A)(r,[["render",o]]),_=P;g()(r,"components",{QIcon:h.A,QBtn:m.A})},5278:(e,a,t)=>{"use strict";t.d(a,{A:()=>A});var s=t(1347);const d={class:"width-300"},l={class:"flex justify-around q-mt-md"};function o(e,a,t,o,n,c){const i=(0,s.g2)("q-icon"),u=(0,s.g2)("q-btn");return(0,s.uX)(),(0,s.CE)("div",d,[(0,s.bF)(i,{name:"eva-trash-2-outline",size:"100px",color:"negative"}),a[0]||(a[0]=(0,s.Lk)("h6",{class:"text-negative no-margin"},"Are you sure?",-1)),a[1]||(a[1]=(0,s.Lk)("p",{class:"text-dark m-width-250"},"Do you really want to delete this record?",-1)),(0,s.Lk)("div",l,[(0,s.bF)(u,{onClick:o.closeDialog,label:"Cancel","no-caps":"",color:"grey-7",class:"button-100"},null,8,["onClick"]),(0,s.bF)(u,{color:"negative",label:"Yes","no-caps":"",class:"button-100",onClick:o.deleteMedicineRecord},null,8,["onClick"])])])}var n=t(6091),c=t(2222),i=t(4202),u=t(3022),r=t(8564);const p={setup(){const e=(0,u.A)(),a=()=>{(0,n.o)()},t=()=>{r.A.show(),c.K.value.id.med_release_id?(0,i.hh)({med_release_id:c.K.value.id.med_release_id}).then((a=>{r.A.hide();let t="success"===a.status?0:1;e.notify({type:0===t?"positive":"negative",classes:"text-white",message:0===t?"Medicine release record deleted successfully":"Failed to delete medicine release record"}),(0,i.i)(c.K.value.id.medicine_id),(0,n.o)()})):(0,i.AU)({medicine_id:c.K.value.id}).then((a=>{r.A.hide();let t="success"===a.status?0:1;e.notify({type:0===t?"positive":"negative",classes:"text-white",message:0===t?"Medicine record deleted successfully":"Failed to delete medicine record"}),(0,n.o)()}))};return{closeDialog:a,deleteMedicineRecord:t,IDList:c.K}}};var h=t(2968),m=t(3933),v=t(1244),g=t(272),P=t.n(g);const _=(0,h.A)(p,[["render",o]]),A=_;P()(p,"components",{QIcon:m.A,QBtn:v.A})},6091:(e,a,t)=>{"use strict";t.d(a,{O:()=>l,o:()=>o});var s=t(4187);const d=(0,s.KR)(!1);let l=(0,s.tB)(d);const o=()=>{d.value=!d.value}},6177:(e,a,t)=>{e.exports=t.p+"img/MHOLogo.d65fe7d6.png"},7370:(e,a,t)=>{"use strict";t.d(a,{Af:()=>o,Hs:()=>c,Nk:()=>p,Z7:()=>i,it:()=>h,md:()=>l,nU:()=>v,pf:()=>g,qd:()=>n,sq:()=>u,ti:()=>m,zQ:()=>r});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.KR)([]),n=(0,d.KR)([]),c=(0,d.KR)([]),i=e=>{let a="http://localhost/MHOCLPRMIMQS PHP/Patients and Household/records_api.php";return new Promise(((t,d)=>{s.A.get(a,{params:{payload:e}}).then((e=>{o.value=e.data.data,t(e.data)})).catch((e=>{d(e)}))}))},u=e=>{let a="http://localhost/MHOCLPRMIMQS PHP/Patients and Household/records_api.php";return new Promise(((t,d)=>{s.A.get(a,{params:{payload:e}}).then((e=>{c.value=e.data.data,t(e.data)})).catch((e=>{d(e)}))}))},r=(e,a)=>{let t="http://localhost/MHOCLPRMIMQS PHP/Patient Records/"+a.toLowerCase()+"_api.php";return new Promise(((d,o)=>{s.A.get(t,{params:{payload:{record_id:e}}}).then((e=>{"OPD"===a||"Prenatal"===a||"Dental"===a?(l.value=e.data.record,n.value=e.data.array):(l.value=e.data.data,n.value=[]),d(e.data)})).catch((e=>{o(e)}))}))},p=(e,a)=>{let t="http://localhost/MHOCLPRMIMQS PHP/Patient Records/"+a.toLowerCase()+"_api.php";return new Promise(((a,d)=>{s.A.post(t,e).then((e=>{if("success"===e.data.status)try{o.value.push(e.data.data)}catch(a){o.value=[],o.value.push(e.data.data)}else console.log(e.data);a(e.data)})).catch((e=>{d(e)}))}))},h=e=>{let a="http://localhost/MHOCLPRMIMQS PHP/Patient Records/prenatal_api.php";return new Promise(((t,d)=>{s.A.post(a,e).then((e=>{if("success"===e.data.status)try{n.value.push(e.data.data)}catch(a){n.value=[],n.value.push(e.data.data)}else console.log(e.data);t(e.data)})).catch((e=>{d(e)}))}))},m=(e,a)=>{let t="http://localhost/MHOCLPRMIMQS PHP/Patient Records/"+a.toLowerCase()+"_api.php";return new Promise(((d,o)=>{s.A.put(t,e).then((e=>{"success"===e.data.status?"OPD"===a||"Prenatal"===a||"Dental"===a?(l.value=e.data.record,n.value=e.data.array):l.value=e.data.data:console.log(e.data),d(e.data)})).catch((e=>{o(e)}))}))},v=e=>{let a="http://localhost/MHOCLPRMIMQS PHP/Patient Records/prenatal_api.php";return new Promise(((t,d)=>{s.A.put(a,e).then((e=>{"success"===e.data.status||console.log(e.data),t(e.data)})).catch((e=>{d(e)}))}))},g=(e,a)=>{let t="http://localhost/MHOCLPRMIMQS PHP/Patient Records/"+a.toLowerCase()+"_api.php";return new Promise(((a,d)=>{s.A.delete(t+"?record_id="+e.record_id).then((t=>{if("success"===t.data.status){let a=o.value.findIndex((a=>a.record_id===Number(e.record_id)));-1!==a&&o.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{d(e)}))}))}},8185:(e,a,t)=>{"use strict";t.d(a,{$2:()=>o,Hv:()=>u,XK:()=>c,fF:()=>r,t2:()=>i,vw:()=>p});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.tB)(l),n=((0,d.KR)([]),"http://localhost/MHOCLPRMIMQS PHP/Patients and Household/household_api.php"),c=e=>new Promise(((a,t)=>{s.A.get(n,{params:{household_id:e.search_string,status:e.status&&e.status}}).then((e=>{l.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),i=e=>new Promise(((a,t)=>{s.A.get(n,{params:{household_name:e.search_string,status:e.status&&e.status}}).then((e=>{l.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),u=e=>new Promise(((a,t)=>{s.A.post(n,e).then((e=>{"success"===e.data.status?l.value.push(e.data.data):console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),r=e=>new Promise(((a,t)=>{s.A.put(n,e).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.household_id===e.household_id));l.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),p=e=>new Promise(((a,t)=>{s.A.delete(n+"?household_id="+e.household_id).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.household_id===e.household_id));-1!==a&&l.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))}))},8822:(e,a,t)=>{"use strict";t.d(a,{Hy:()=>o,JM:()=>v,Jt:()=>h,L:()=>p,RO:()=>m,TB:()=>c,Wh:()=>u,i4:()=>i,ol:()=>r});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.tB)(l),n="http://localhost/MHOCLPRMIMQS PHP/Users and Departments/manage_user_api.php",c=e=>new Promise(((a,t)=>{s.A.get(n,{params:{payload:e}}).then((e=>{l.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),i=e=>new Promise(((a,t)=>{s.A.get(n,{params:{name:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),u=e=>new Promise(((a,t)=>{s.A.get(n,{params:{id:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),r=e=>new Promise(((a,t)=>{s.A.get(n,{params:{id:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),p=e=>new Promise(((a,t)=>{s.A.post(n,e).then((e=>{"success"===e.data.status?l.value.push(e.data.data):console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),h=e=>new Promise(((a,t)=>{s.A.put(n,e).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.user_id===e.user_id));l.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),m=e=>new Promise(((a,t)=>{s.A.put(n,e).then((e=>{console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),v=e=>new Promise(((a,t)=>{s.A.delete(n+"?user_id="+e.user_id).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.user_id===e.user_id));-1!==a&&l.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))}))},8883:(e,a,t)=>{"use strict";t.d(a,{$h:()=>c,DU:()=>h,P5:()=>v,Qz:()=>m,SP:()=>r,Ud:()=>o,Wb:()=>g,dB:()=>_,jw:()=>p,o6:()=>u,rn:()=>P,uQ:()=>n});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.tB)(l),n=(0,d.KR)([]),c=(0,d.KR)([]),i="http://localhost/MHOCLPRMIMQS PHP/Queue/queue_api.php",u=()=>new Promise(((e,a)=>{s.A.get(i).then((a=>{l.value=a.data.data,e(a.data)})).catch((e=>{a(e)}))})),r=e=>new Promise(((a,t)=>{s.A.get(i,{params:{department:e}}).then((e=>{n.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),p=e=>new Promise(((a,t)=>{s.A.get(i,{params:{patient_id:e.patient_id,sex:e.sex}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),h=e=>new Promise(((a,t)=>{s.A.get(i,{params:{department_specific:e.department,priority:e.priority}}).then((e=>{console.log(e.data),c.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),m=e=>new Promise(((a,t)=>{s.A.post(i,e).then((e=>{"success"===e.data.status||console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),v=e=>new Promise(((a,t)=>{s.A.put(i,e).then((t=>{if(console.log(t.data),"success"===t.data.status){let a=n.value.findIndex((a=>a.queue_id===e.next_patient));n.value[a].is_current=1;let t=n.value.findIndex((a=>a.queue_id===e.current_patient));-1!==t&&n.value.splice(t,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),g=e=>new Promise(((a,t)=>{s.A.put(i,e).then((t=>{if("success"===t.data.status){let a=n.value.findIndex((a=>a.queue_id===e.current_patient));-1!==a&&n.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),P=e=>new Promise(((a,t)=>{s.A.delete(i+"?queue_id="+e.queue_id).then((t=>{if(console.log(t.data),"success"===t.data.status){let a=n.value.findIndex((a=>a.queue_id===e.queue_id));-1!==a&&n.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),_=e=>new Promise(((a,t)=>{s.A.delete(i+"?department="+e.department).then((t=>{"success"===t.data.status?1===e.department?l.value.OPD=[]:2===e.department?l.value.Dental=[]:3===e.department?l.value.Prenatal=[]:7===e.department&&(l.value.Immunization=[]):console.log(t.data),a(t.data)})).catch((e=>{t(e)}))}))},9077:(e,a,t)=>{"use strict";t.d(a,{D7:()=>r,DD:()=>m,Mq:()=>h,X:()=>_,_W:()=>g,_t:()=>y,hn:()=>A,kd:()=>n,nH:()=>w,ne:()=>v,qf:()=>P,qj:()=>o,uo:()=>u,vz:()=>p,zs:()=>c});var s=t(9100),d=t(4187);let l=(0,d.KR)([]),o=(0,d.tB)(l),n=(0,d.KR)([]),c=(0,d.KR)([]),i="http://localhost/MHOCLPRMIMQS PHP/Medicine and Supplies/supply_inventory_api.php",u=e=>new Promise(((a,t)=>{s.A.get(i,{params:{payload:e}}).then((e=>{"success"===e.data.status?l.value=e.data.data:console.log(e.data.data),a(e.data)})).catch((e=>{t(e)}))})),r=e=>new Promise(((a,t)=>{s.A.get(i,{params:{date:e}}).then((e=>{a(e.data)})).catch((e=>{t(e)}))})),p=e=>new Promise(((a,t)=>{s.A.get(i,{params:{supply_id:e}}).then((e=>{n.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),h=e=>new Promise(((a,t)=>{s.A.get(i,{params:{release_filter:e}}).then((e=>{c.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),m=e=>new Promise(((a,t)=>{s.A.get(i,{params:{supply_name:e,for_release:!0}}).then((e=>{c.value=e.data.data,a(e.data)})).catch((e=>{t(e)}))})),v=e=>new Promise(((a,t)=>{s.A.post(i,e).then((e=>{if("success"===e.data.status)try{l.value.push(e.data.data)}catch(a){l.value=[],l.value.push(e.data.data)}else console.log(e.data);a(e.data)})).catch((e=>{t(e)}))})),g=e=>new Promise(((a,t)=>{s.A.post(i,e).then((e=>{if("success"===e.data.status)try{c.value.push(e.data.data)}catch(a){c.value=[],c.value.push(e.data.data)}else console.log(e.data);a(e.data)})).catch((e=>{t(e)}))})),P=e=>new Promise(((a,t)=>{s.A.put(i,e).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.supply_id===e.supply_id));l.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),_=e=>new Promise(((a,t)=>{s.A.put(i,e).then((t=>{if("success"===t.data.status){let a=c.value.findIndex((a=>a.supply_release_id===e.supply_release_id));c.value[a]=t.data.data}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),A=e=>new Promise(((a,t)=>{s.A.put(i,e).then((e=>{console.log(e.data),a(e.data)})).catch((e=>{t(e)}))})),w=e=>new Promise(((a,t)=>{s.A.delete(i+"?supply_id="+e.supply_id).then((t=>{if("success"===t.data.status){let a=l.value.findIndex((a=>a.supply_id===e.supply_id));-1!==a&&l.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))})),y=e=>new Promise(((a,t)=>{s.A.delete(i+"?supply_release_id="+e.supply_release_id).then((t=>{if("success"===t.data.status){let a=c.value.findIndex((a=>a.supply_release_id===e.supply_release_id));-1!==a&&c.value.splice(a,1)}else console.log(t.data);a(t.data)})).catch((e=>{t(e)}))}))}}]);