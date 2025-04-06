"use strict";(globalThis["webpackChunkmhoclprmimqs"]=globalThis["webpackChunkmhoclprmimqs"]||[]).push([[731],{1731:(e,t,s)=>{s.r(t),s.d(t,{default:()=>ye});var a=s(1347),n=s(7763);const i={class:"dashboard"},l={class:"q-mx-md q-my-md q-pa-lg"},o={class:"text-center text-primary"},r={class:"text-bold",style:{"font-size":"30px"}},d={class:"row q-mt-lg"},u={key:0,class:"column queue q-pa-md q-mr-lg shadow-5"},c={class:"q-mt-lg"},m={class:"inside-container current"},p={key:0,class:"text-center text-bold"},k={key:0},y={class:"row"},b={key:1,class:"text-primary text-center text-bold text-20"},v={key:0,class:"q-mt-lg text-center"},x={class:"q-mt-sm"},_={style:{display:"flex","align-items":"center"}},h={style:{"margin-left":"5px"}},f={style:{display:"flex","align-items":"center"}},S={style:{"margin-left":"5px"}},C={key:1,class:"q-mt-lg text-center inside-container current"},g={class:"flex justify-between q-mt-sm text-weight-medium text-amber-9"},w={class:"flex justify-between q-mt-sm text-weight-medium text-primary"},L={key:2,class:"q-mt-sm"},P={style:{"text-align":"center"}},F={key:0},q={class:"flex justify-between items-center"},D={class:"text-amber-9 text-bold",style:{cursor:"pointer","font-size":"16px"},clickable:""},A={style:{"text-align":"center"}},Q={key:0},z={class:"flex justify-between items-center"},R={class:"text-primary text-bold",style:{cursor:"pointer","font-size":"16px"},clickable:""},E={class:"col to-do"},X={class:"to-do-grid"},B={class:"q-pa-lg text-center",style:{width:"400px"}},V={class:"text-center"},I={class:"flex items-center justify-between q-mt-lg"},$={class:"text-center"},N={class:"flex justify-around q-mt-md"};function K(e,t,s,K,T,M){const O=(0,a.g2)("q-select"),U=(0,a.g2)("q-btn"),j=(0,a.g2)("q-icon"),W=(0,a.g2)("q-separator"),H=(0,a.g2)("q-card"),G=(0,a.g2)("q-dialog"),J=(0,a.g2)("MHCDialog"),Y=(0,a.gN)("close-popup");return(0,a.uX)(),(0,a.CE)("div",i,[(0,a.Lk)("div",l,[(0,a.Lk)("div",o,[(0,a.Lk)("label",r,"Hello "+(0,n.v_)(e.keySession&&e.keySession.first_name),1),t[24]||(t[24]=(0,a.Lk)("p",{class:"content q-mt-sm"},"What would you like to do today?",-1))]),(0,a.Lk)("div",d,[e.keySession&&4!==e.keySession.department&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("fieldset",u,[t[30]||(t[30]=(0,a.Lk)("div",{style:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center"}},[(0,a.Lk)("label",{class:"text-primary text-bold",style:{"font-size":"25px"}},"Patient Queue")],-1)),(0,a.bF)(O,{flat:"",dense:"",outlined:"",options:e.departmentList,modelValue:e.selectedDepartment,"onUpdate:modelValue":[t[0]||(t[0]=t=>e.selectedDepartment=t),e.getDepartments],class:"q-mt-md",readonly:!(!e.departmentList||1!==e.departmentList.length)},null,8,["options","modelValue","onUpdate:modelValue","readonly"]),(0,a.Lk)("div",c,[(0,a.Lk)("div",null,[(0,a.Lk)("fieldset",m,[t[25]||(t[25]=(0,a.Lk)("legend",{class:"text-bold text-center q-px-sm",style:{color:"#55a15e"}}," CURRENT PATIENT ",-1)),e.currentPatient&&e.currentPatient.patient_id?((0,a.uX)(),(0,a.CE)("div",p,[(0,a.Lk)("div",{style:(0,n.Tr)(e.currentPatient&&1===e.currentPatient.is_priority?"font-size: x-large; cursor: pointer; color: #ff8f00":"font-size: x-large; cursor: pointer; color: #55a15e"),onClick:t[1]||(t[1]=t=>e.keySession&&(e.dept===e.keySession.department||7===e.dept&&3===e.keySession.department)?e.$router.push({name:"patient-details",params:{id:e.currentPatient.patient_id,queue:e.currentPatient.queue_id,department_queue:5===e.keySession.department?"OPD":e.selectedDepartment}}):"")},(0,n.v_)(e.currentPatient&&e.currentPatient.patient_id),5),(0,a.Lk)("div",{style:(0,n.Tr)(e.currentPatient&&1===e.currentPatient.is_priority?"color: #ff8f00":"color: #55a15e")},(0,n.v_)(e.currentPatient&&e.currentPatient.first_name+(e.currentPatient.middle_name?" "+e.currentPatient.middle_name:"")+" "+e.currentPatient.last_name+(e.currentPatient.suffix?" "+e.currentPatient.suffix:"")),5),e.keySession&&6!==e.keySession.department?((0,a.uX)(),(0,a.CE)("div",k,[(0,a.Lk)("div",y,[(0,a.bF)(U,{dense:"","no-caps":"",color:"negative",label:"Remove",icon:"delete",class:"col q-mt-xs q-mr-xs",style:{width:"100%"},disable:!e.keySession||e.dept!==e.keySession.department&&(7!==e.dept||3!==e.keySession.department),onClick:t[2]||(t[2]=t=>e.isRemoveFromCurrentQueue=!e.isRemoveFromCurrentQueue)},null,8,["disable"])])])):(0,a.Q3)("",!0)])):((0,a.uX)(),(0,a.CE)("div",b," No Patient "))])]),e.keySession&&6!==e.keySession.department?((0,a.uX)(),(0,a.CE)("div",v,[t[26]||(t[26]=(0,a.Lk)("label",{class:"text-primary text-bold q-px-sm"}," Call in Next Patient ",-1)),(0,a.Lk)("div",x,[(0,a.bF)(U,{style:{width:"100%"},color:"amber-9",disable:!(null===e.currentPatient&&e.priorityPatients&&e.priorityPatients[0]&&e.keySession&&(e.dept===e.keySession.department||7===e.dept&&3===e.keySession.department))||5!==e.keySession.department&&1!==e.keySession.department&&2!==e.keySession.department&&3!==e.keySession.department,onClick:e.callInNextPriority},{default:(0,a.k6)((()=>[(0,a.Lk)("div",_,[(0,a.bF)(j,{name:"priority_high",size:"30px"}),(0,a.Lk)("label",h,"priority patients ("+(0,n.v_)(e.priorityPatients.length)+")",1)])])),_:1},8,["disable","onClick"]),(0,a.bF)(U,{style:{width:"100%"},class:"q-mt-sm",color:"primary",disable:!(null===e.currentPatient&&e.otherPatients&&e.otherPatients[0]&&e.keySession&&(e.dept===e.keySession.department||7===e.dept&&3===e.keySession.department))||5!==e.keySession.department&&1!==e.keySession.department&&2!==e.keySession.department&&3!==e.keySession.department,onClick:e.callInNextPatient},{default:(0,a.k6)((()=>[(0,a.Lk)("div",f,[(0,a.bF)(j,{name:"mic",size:"30px"}),(0,a.Lk)("label",S,"Other patients ("+(0,n.v_)(e.otherPatients.length)+")",1)])])),_:1},8,["disable","onClick"])])])):(0,a.Q3)("",!0),e.keySession&&6===e.keySession.department?((0,a.uX)(),(0,a.CE)("fieldset",C,[t[29]||(t[29]=(0,a.Lk)("legend",{class:"text-bold text-center q-px-sm",style:{color:"#55a15e"}}," PATIENTS IN QUEUE ",-1)),(0,a.Lk)("div",g,[t[27]||(t[27]=(0,a.Lk)("label",null,"Priority Patients:",-1)),(0,a.Lk)("label",null,(0,n.v_)(e.priorityPatients.length),1)]),(0,a.Lk)("div",w,[t[28]||(t[28]=(0,a.Lk)("label",null,"Non-Priority Patients:",-1)),(0,a.Lk)("label",null,(0,n.v_)(e.otherPatients.length),1)])])):(0,a.Q3)("",!0),e.keySession&&5===e.keySession.department&&3!==e.keySession.permission_level?((0,a.uX)(),(0,a.CE)("div",L,[(0,a.Lk)("div",P,[(0,a.bF)(U,{flat:"","no-caps":"",dense:"",label:"Show Priority Patients",color:"primary","icon-right":e.showPriority?"arrow_drop_up":"arrow_drop_down",onClick:t[3]||(t[3]=t=>e.showPriority=!e.showPriority)},null,8,["icon-right"]),e.showPriority?((0,a.uX)(),(0,a.CE)("div",F,[(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.priorityPatients,((t,s)=>((0,a.uX)(),(0,a.CE)("li",{key:s,class:"q-px-sm text-amber-9 text-bold"},[(0,a.Lk)("div",q,[(0,a.Lk)("label",D,(0,n.v_)(t.queue_number)+" - "+(0,n.v_)(t.last_name),1),e.keySession&&5===e.keySession.department?((0,a.uX)(),(0,a.Wv)(j,{key:0,color:"negative",size:"20px",name:"delete",onClick:s=>e.removeFromQueue(t.queue_id)},null,8,["onClick"])):(0,a.Q3)("",!0)])])))),128))])])):(0,a.Q3)("",!0)]),(0,a.Lk)("div",A,[(0,a.bF)(U,{flat:"","no-caps":"",dense:"",label:"Show Other Patients",color:"primary","icon-right":e.showOthers?"arrow_drop_up":"arrow_drop_down",onClick:t[4]||(t[4]=t=>e.showOthers=!e.showOthers)},null,8,["icon-right"]),e.showOthers?((0,a.uX)(),(0,a.CE)("div",Q,[(0,a.Lk)("ul",null,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(e.otherPatients,((t,s)=>((0,a.uX)(),(0,a.CE)("li",{key:s,class:"q-px-sm text-primary text-bold"},[(0,a.Lk)("div",z,[(0,a.Lk)("label",R,(0,n.v_)(t.queue_number)+" - "+(0,n.v_)(t.last_name),1),e.keySession&&5===e.keySession.department?((0,a.uX)(),(0,a.Wv)(j,{key:0,color:"negative",name:"delete",size:"20px",onClick:s=>e.removeFromQueue(t.queue_id)},null,8,["onClick"])):(0,a.Q3)("",!0)])])))),128))])])):(0,a.Q3)("",!0)])])):(0,a.Q3)("",!0)])])):(0,a.Q3)("",!0),(0,a.Lk)("div",E,[(0,a.Lk)("div",X,[e.keySession&&6===e.keySession.department&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:0,class:"to-do-box shadow-5",onClick:t[5]||(t[5]=t=>e.$router.push({name:"dashboard"}))},[(0,a.bF)(j,{name:"bar_chart",size:"100px",class:"to-do-label"}),t[31]||(t[31]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Dashboard",-1))])):(0,a.Q3)("",!0),"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:1,class:"to-do-box shadow-5",onClick:t[6]||(t[6]=t=>e.$router.push({name:"search-patients"}))},[(0,a.bF)(j,{name:"group",size:"100px",class:"to-do-label"}),t[32]||(t[32]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Patient Profiles",-1))])):(0,a.Q3)("",!0),e.keySession&&5===e.keySession.department&&3!==e.keySession.permission_level?((0,a.uX)(),(0,a.CE)("div",{key:2,class:"to-do-box shadow-5",onClick:t[7]||(t[7]=t=>e.$router.push({name:"add-edit-patient-record"}))},[(0,a.bF)(j,{name:"person_add",size:"100px",class:"to-do-label"}),t[33]||(t[33]=(0,a.Lk)("label",{class:"text-center to-do-label"},"Add Patient Profile",-1))])):(0,a.Q3)("",!0),"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:3,class:"to-do-box shadow-5",onClick:t[8]||(t[8]=t=>e.$router.push({name:"search-records"}))},[(0,a.bF)(j,{name:"medical_information",size:"100px",class:"to-do-label"}),t[34]||(t[34]=(0,a.Lk)("label",{class:"text-center to-do-label"},"Search Health Records",-1))])):(0,a.Q3)("",!0),"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:4,class:"to-do-box shadow-5",onClick:t[9]||(t[9]=t=>e.$router.push({name:"household-records"}))},[(0,a.bF)(j,{name:"home",size:"100px",class:"to-do-label"}),t[35]||(t[35]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Household Records",-1))])):(0,a.Q3)("",!0),"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:5,class:"to-do-box shadow-5",onClick:t[10]||(t[10]=t=>e.$router.push({name:"pwd-records"}))},[(0,a.bF)(j,{name:"accessible",size:"100px",class:"to-do-label"}),t[36]||(t[36]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View PWD Records",-1))])):(0,a.Q3)("",!0),"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:6,class:"to-do-box shadow-5",onClick:t[11]||(t[11]=t=>e.$router.push({name:"senior-citizen-records"}))},[(0,a.bF)(j,{name:"elderly",size:"100px",class:"to-do-label"}),t[37]||(t[37]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Senior Citizen Records",-1))])):(0,a.Q3)("",!0),e.keySession&&1!==e.keySession.department&&2!==e.keySession.department&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:7,class:"to-do-box shadow-5",onClick:t[12]||(t[12]=t=>e.$router.push({name:"pregnant-women-records"}))},[(0,a.bF)(j,{name:"pregnant_woman",size:"100px",class:"to-do-label"}),t[38]||(t[38]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Pregnancy Records",-1))])):(0,a.Q3)("",!0),e.keySession&&(4===e.keySession.department||6===e.keySession.department&&1===e.keySession.permission_level)&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:8,class:"to-do-box shadow-5",onClick:t[13]||(t[13]=t=>e.$router.push({name:"medicine-inventory"}))},[(0,a.bF)(j,{name:"medication",size:"100px",class:"to-do-label"}),t[39]||(t[39]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Medicine Inventory",-1))])):(0,a.Q3)("",!0),e.keySession&&(4===e.keySession.department||6===e.keySession.department&&1===e.keySession.permission_level)&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:9,class:"to-do-box shadow-5",onClick:t[14]||(t[14]=t=>e.$router.push({name:"medicine-release"}))},[(0,a.bF)(j,{name:"volunteer_activism",size:"100px",class:"to-do-label"}),t[40]||(t[40]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Medicine Release",-1))])):(0,a.Q3)("",!0),e.keySession&&(4===e.keySession.department||6===e.keySession.department&&1===e.keySession.permission_level)&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:10,class:"to-do-box shadow-5",onClick:t[15]||(t[15]=t=>e.$router.push({name:"supply-inventory"}))},[(0,a.bF)(j,{name:"vaccines",size:"100px",class:"to-do-label"}),t[41]||(t[41]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Supplies Inventory",-1))])):(0,a.Q3)("",!0),e.keySession&&(4===e.keySession.department||6===e.keySession.department&&1===e.keySession.permission_level)&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:11,class:"to-do-box shadow-5",onClick:t[16]||(t[16]=t=>e.$router.push({name:"supply-release"}))},[(0,a.bF)(j,{name:"fa fa-boxes-packing",size:"100px",class:"to-do-label"}),t[42]||(t[42]=(0,a.Lk)("label",{class:"text-center to-do-label"},"View Supply Release",-1))])):(0,a.Q3)("",!0),e.keySession&&6===e.keySession.department&&1===e.keySession.permission_level&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:12,class:"to-do-box shadow-5",onClick:t[17]||(t[17]=t=>e.$router.push({name:"manage-users"}))},[(0,a.bF)(j,{name:"account_circle",size:"100px",class:"to-do-label"}),t[43]||(t[43]=(0,a.Lk)("label",{class:"text-center to-do-label"},"Manage User Accounts",-1))])):(0,a.Q3)("",!0),e.keySession&&6===e.keySession.department&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:13,class:"to-do-box shadow-5",onClick:t[18]||(t[18]=t=>e.$router.push({name:"reports"}))},[(0,a.bF)(j,{name:"description",size:"100px",class:"to-do-label"}),t[44]||(t[44]=(0,a.Lk)("label",{class:"text-center to-do-label"},"Generate Reports",-1))])):(0,a.Q3)("",!0),e.keySession&&6===e.keySession.department&&1===e.keySession.permission_level&&"setupAdmin"!==e.keySession.username?((0,a.uX)(),(0,a.CE)("div",{key:14,class:"to-do-box shadow-5",onClick:t[19]||(t[19]=(...t)=>e.backupDB&&e.backupDB(...t))},[(0,a.bF)(j,{name:"cloud_download",size:"100px",class:"to-do-label"}),t[45]||(t[45]=(0,a.Lk)("label",{class:"text-center to-do-label"},"Backup Database",-1))])):(0,a.Q3)("",!0),e.keySession&&6===e.keySession.department&&1===e.keySession.permission_level?((0,a.uX)(),(0,a.CE)("div",{key:15,class:"to-do-box shadow-5",onClick:t[20]||(t[20]=(...t)=>e.openRestoreDBModal&&e.openRestoreDBModal(...t))},[(0,a.bF)(j,{name:"cloud_upload",size:"100px",class:"to-do-label"}),t[46]||(t[46]=(0,a.Lk)("label",{class:"text-center to-do-label"},"Restore Database to last Backup",-1))])):(0,a.Q3)("",!0),(0,a.bF)(G,{persistent:"",modelValue:e.isRestoreDB,"onUpdate:modelValue":t[22]||(t[22]=t=>e.isRestoreDB=t)},{default:(0,a.k6)((()=>[(0,a.bF)(H,null,{default:(0,a.k6)((()=>[(0,a.Lk)("div",B,[(0,a.bF)(j,{name:"cloud_upload",size:"100px",color:"primary"}),t[48]||(t[48]=(0,a.Lk)("div",null,[(0,a.Lk)("p",{class:"text-primary text-weight-bold text-24 text-center"}," Are you sure? "),(0,a.Lk)("p",{class:"text-grey-7 text-center"},[(0,a.eW)(" This will restore the database to its previous version. "),(0,a.Lk)("span",{class:"text-negative text-center"},"This process cannot be undone!")])],-1)),(0,a.Lk)("div",V,[(0,a.bF)(W,{size:"2px",color:"primary"}),t[47]||(t[47]=(0,a.Lk)("p",{style:{"font-size":"small"},class:"q-mt-md text-grey-7"}," Which database version would you like to restore? ",-1)),(0,a.bF)(O,{dense:"",outlined:"",options:e.DBList,modelValue:e.selectedDB,"onUpdate:modelValue":t[21]||(t[21]=t=>e.selectedDB=t)},null,8,["options","modelValue"])]),(0,a.Lk)("div",I,[(0,a.bo)((0,a.bF)(U,{label:"Cancel","no-caps":"",color:"grey-7",class:"button-120"},null,512),[[Y]]),(0,a.bF)(U,{label:"Yes","no-caps":"",color:"primary",class:"button-120",disable:null===e.selectedDB,onClick:e.restoreDB},null,8,["disable","onClick"])])])])),_:1})])),_:1},8,["modelValue"])])])]),(0,a.bF)(G,{modelValue:e.isRemoveFromCurrentQueue,"onUpdate:modelValue":t[23]||(t[23]=t=>e.isRemoveFromCurrentQueue=t),persistent:""},{default:(0,a.k6)((()=>[(0,a.bF)(H,{class:"q-pa-md",style:{width:"300px"}},{default:(0,a.k6)((()=>[(0,a.Lk)("div",null,[(0,a.Lk)("div",$,[(0,a.bF)(j,{name:"playlist_remove",size:"100px",color:"negative"}),t[49]||(t[49]=(0,a.Lk)("h6",{class:"text-negative no-margin"},"Are you sure?",-1)),t[50]||(t[50]=(0,a.Lk)("p",{class:"text-dark m-width-250"}," Do you want to remove this current patient from queue? ",-1))]),(0,a.Lk)("div",N,[(0,a.bo)((0,a.bF)(U,{label:"Cancel","no-caps":"",color:"grey-7",class:"button-100"},null,512),[[Y]]),(0,a.bo)((0,a.bF)(U,{color:"negative",label:"Yes","no-caps":"",class:"button-100",onClick:e.removeCurrentPatient},null,8,["onClick"]),[[Y]])])])])),_:1})])),_:1},8,["modelValue"])]),(0,a.bF)(J,{content:e.$options.components.RemoveFromQueue},null,8,["content"])])}var T=s(4187),M=s(3022),O=s(3328),U=s(8564),j=s(662);const W={class:"width-300"},H={class:"flex justify-around q-mt-md"};function G(e,t,s,n,i,l){const o=(0,a.g2)("q-icon"),r=(0,a.g2)("q-btn");return(0,a.uX)(),(0,a.CE)("div",W,[(0,a.bF)(o,{name:"playlist_remove",size:"100px",color:"negative"}),t[0]||(t[0]=(0,a.Lk)("h6",{class:"text-negative no-margin"},"Are you sure?",-1)),t[1]||(t[1]=(0,a.Lk)("p",{class:"text-dark m-width-250"},"Do you want to remove this patient from queue?",-1)),(0,a.Lk)("div",H,[(0,a.bF)(r,{onClick:n.closeDialog,label:"Cancel","no-caps":"",color:"grey-7",class:"button-100"},null,8,["onClick"]),(0,a.bF)(r,{color:"negative",label:"Yes","no-caps":"",class:"button-100",onClick:n.removeFromQueue},null,8,["onClick"])])])}var J=s(6091);const Y={setup(){const e=(0,M.A)(),t=()=>{(0,J.o)()},s=()=>{e.notify({type:0===status?"positive":"negative",classes:"text-white",message:0===status?"Patient removed from queue successfully":"Failed to remove patient from queue"})};return{closeDialog:t,removeFromQueue:s}}};var Z=s(2968),ee=s(3933),te=s(1244),se=s(272),ae=s.n(se);const ne=(0,Z.A)(Y,[["render",G]]),ie=ne;ae()(Y,"components",{QIcon:ee.A,QBtn:te.A});var le=s(455);const oe={components:{MHCDialog:j.A,RemoveFromQueue:ie},setup(){const e=(0,le.rd)(),t=(0,M.A)();let s=O.A.getItem("cred");s||e.push({name:"login"});s&&s.department;let a=(0,T.KR)([]);NaN==s&&null==s||(s&&1===s.department?a.value=["OPD"]:s&&2===s.department?a.value=["Dental"]:s&&3===s.department?a.value=["Prenatal","Immunization"]:a.value=["Front Desk","OPD","Dental","Prenatal","Immunization"]);let n=(0,T.KR)(a.value[0]),i=(0,T.KR)(null);"Front Desk"===n.value?i.value=5:"OPD"===n.value?i.value=1:"Dental"===n.value?i.value=2:"Prenatal"===n.value?i.value=3:"Immunization"===n.value&&(i.value=7);const l=()=>{u.value=null,m.value=[],p.value=[],"Front Desk"===n.value?i.value=5:"OPD"===n.value?i.value=1:"Dental"===n.value?i.value=2:"Prenatal"===n.value?i.value=3:"Immunization"===n.value&&(i.value=7),U.A.show(),c.forEach((e=>{e.department===i.value&&(1===e.is_priority?m.value.push(e):p.value.push(e))})),U.A.hide()},o=e=>{(0,J.o)()};let r=(0,T.KR)(!1);const d=()=>{u.value=null};let u=(0,T.KR)({patient_id:"DF1345",queue_id:1,first_name:"Juan",last_name:"Bautista",middle_name:"Dela Cruz",suffix:"",is_current:1,is_priority:0,department:1}),c=[{patient_id:"DF1351",queue_id:7,first_name:"Emilio",last_name:"Aguinaldo",middle_name:"Garcia",suffix:"",is_current:0,is_priority:1,department:2},{patient_id:"DF1352",queue_id:8,first_name:"Andres",last_name:"Bonifacio",middle_name:"Cruz",suffix:"",is_current:0,is_priority:1,department:3},{patient_id:"DF1353",queue_id:9,first_name:"Gregoria",last_name:"Silang",middle_name:"Lopez",suffix:"",is_current:0,is_priority:1,department:5},{patient_id:"DF1354",queue_id:10,first_name:"Apolinario",last_name:"Mabini",middle_name:"Santos",suffix:"",is_current:0,is_priority:1,department:1},{patient_id:"DF1355",queue_id:11,first_name:"Melchora",last_name:"Aquino",middle_name:"Torres",suffix:"",is_current:0,is_priority:1,department:2},{patient_id:"DF1356",queue_id:12,first_name:"Francisco",last_name:"Balagtas",middle_name:"Reyes",suffix:"",is_current:0,is_priority:1,department:1},{patient_id:"DF1346",queue_id:2,first_name:"Maria",last_name:"Reyes",middle_name:"Santos",suffix:"",is_current:0,is_priority:1,department:1},{patient_id:"DF1347",queue_id:3,first_name:"Jose",last_name:"Luna",middle_name:"Garcia",suffix:"",is_current:0,is_priority:1,department:2},{patient_id:"DF1348",queue_id:4,first_name:"Ana",last_name:"Rivera",middle_name:"Mendoza",suffix:"",is_current:0,is_priority:1,department:2},{patient_id:"DF1349",queue_id:5,first_name:"Carlos",last_name:"Ramos",middle_name:"Fernandez",suffix:"Jr.",is_current:0,is_priority:1,department:3},{patient_id:"DF1350",queue_id:6,first_name:"Luisa",last_name:"Valdez",middle_name:"Torres",suffix:"",is_current:0,is_priority:0,department:5}],m=(0,T.KR)([]),p=(0,T.KR)([]);const k=()=>{U.A.show(),u.value=m.value[0],m.value.shift(),U.A.hide()},y=()=>{U.A.show(),u.value=m.value[0],m.value.shift(),U.A.hide()},b=()=>{};let v=(0,T.KR)(!1),x=(0,T.KR)(!1),_=(0,T.KR)(!1),h=(0,T.KR)(null),f=["DB1","DB2","DB3"];const S=()=>{t.notify({type:"positive",classes:"text-white",message:"Database backed up successfully"})},C=()=>{_.value=!0},g=()=>{t.notify({type:"positive",classes:"text-white",message:"Database restored successfully"})};return{departmentList:a,selectedDepartment:n,getDepartments:l,keySession:s,removeFromQueue:o,currentPatient:u,priorityPatients:m,otherPatients:p,callInNextPriority:k,callInNextPatient:y,showPriority:v,showOthers:x,backupDB:S,restoreDB:g,isRestoreDB:_,doneCurrentPatient:b,openRestoreDBModal:C,DBList:f,selectedDB:h,isRemoveFromCurrentQueue:r,removeCurrentPatient:d,dept:i}}};var re=s(9549),de=s(45),ue=s(3341),ce=s(6915),me=s(6067),pe=s(8657);const ke=(0,Z.A)(oe,[["render",K]]),ye=ke;ae()(oe,"components",{QIcon:ee.A,QSelect:re.A,QBtn:te.A,QDialog:de.A,QCard:ue.A,QSeparator:ce.A,QInput:me.A}),ae()(oe,"directives",{ClosePopup:pe.A})}}]);