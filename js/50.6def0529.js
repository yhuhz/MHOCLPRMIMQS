"use strict";(globalThis["webpackChunkmhoclprmimqs"]=globalThis["webpackChunkmhoclprmimqs"]||[]).push([[50],{3050:(e,t,l)=>{l.r(t),l.d(t,{default:()=>fe});var i=l(1347),n=l(7763);const o={class:"q-pa-md"},s={class:"flex justify-between"},a={class:"column items-center"},d={class:"text-primary text-weight-bold text-h4"},r={key:0},u={key:0},c={key:1},p={class:"grid q-mt-lg"},m={class:"preliminary-checkup q-mr-sm"},y={class:"flex justify-between items-baseline q-px-md"},b={class:"flex justify-between items-baseline q-px-md"},k={class:"flex justify-between items-baseline q-px-md"},h={class:"flex items-center justify-end"},v={class:"flex justify-between items-baseline q-px-md"},_={class:"flex justify-between items-baseline q-px-md"},g={class:"flex justify-between items-baseline q-px-md"},x={class:"flex justify-between items-baseline q-px-md"},f={class:"doctors-notes q-ml-sm"},F={class:"q-px-md"},L={class:"flex justify-between items-baseline"},q={class:"flex justify-between items-baseline"},w={class:"flex justify-between items-baseline"},V={class:"flex justify-between items-baseline"},C={class:"row justify-end items-center"},R={class:"text-primary q-mb-md",style:{"border-top":"1px solid",overflow:"auto"}},S={class:"findings bottom-boxes q-mt-md q-mr-sm"},I={class:"bg-primary text-white text-center findings-heading"},P={class:"laboratory-results q-mt-md q-ml-sm"},A={class:"bg-primary text-center text-white lr-heading"},Q={class:"flex justify-between items-center q-mt-md"},U={class:"text-bold text-dark q-my-none"},N={class:"q-mb-md"},X={key:0,class:"text-center"},D={class:"row"},j={key:0,class:"col-2 text-dark",style:{visibility:"hidden"}},E={class:"row q-mb-md"},K={class:"row"};function W(e,t,l,W,M,O){const B=(0,i.g2)("q-btn"),H=(0,i.g2)("q-select"),z=(0,i.g2)("q-input"),T=(0,i.g2)("q-date"),Y=(0,i.g2)("q-popup-proxy"),$=(0,i.g2)("q-icon"),G=(0,i.g2)("q-form"),J=(0,i.g2)("q-separator"),Z=(0,i.g2)("q-card"),ee=(0,i.g2)("q-dialog"),te=(0,i.g2)("MHCDialog"),le=(0,i.gN)("close-popup");return(0,i.uX)(),(0,i.CE)("div",o,[(0,i.bF)(G,{onSubmit:e.editFunction},{default:(0,i.k6)((()=>[(0,i.Lk)("div",s,[(0,i.Lk)("div",a,[(0,i.Lk)("label",d,"OPD"+(0,n.v_)(e.$route.params.record_id),1)]),!e.keySession||1!==e.keySession.department&&5!==e.keySession.department||3===e.keySession.permission_level?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("div",r,[e.editForm?(0,i.Q3)("",!0):((0,i.uX)(),(0,i.CE)("div",u,[(0,i.bF)(B,{onClick:t[0]||(t[0]=t=>e.editForm=!e.editForm),dense:"",label:"Edit",icon:"eva-edit-outline","no-caps":"",color:"primary",class:"q-px-lg"})])),e.editForm?((0,i.uX)(),(0,i.CE)("div",c,[(0,i.bF)(B,{dense:"",label:"Save",type:"submit",icon:"save","no-caps":"",color:"primary",class:"q-px-lg"}),(0,i.bF)(B,{onClick:e.cancelFunction,dense:"",label:"Cancel",icon:"close","no-caps":"",class:"q-px-lg q-ml-sm",outline:"",color:"primary"},null,8,["onClick"])])):(0,i.Q3)("",!0)]))]),(0,i.Lk)("div",p,[(0,i.Lk)("div",m,[t[25]||(t[25]=(0,i.Lk)("div",null,[(0,i.Lk)("p",{class:"bg-primary text-white text-center pc-heading"}," Preliminary Checkup ")],-1)),(0,i.Lk)("div",y,[t[17]||(t[17]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Done by",-1)),(0,i.bF)(H,{"hide-bottom-space":"",outlined:"",modelValue:e.patientRecordInfo.preliminary_checkup_done_by,"onUpdate:modelValue":t[1]||(t[1]=t=>e.patientRecordInfo.preliminary_checkup_done_by=t),onFilter:e.userFilterFunction,"option-label":"user_name","option-value":"user_id",options:e.userOptions,"emit-value":"","map-options":"",dense:"",readonly:"","input-style":"padding: 0","input-class":"text-right text-primary"},null,8,["modelValue","onFilter","options"])]),(0,i.Lk)("div",b,[t[18]||(t[18]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Temperature",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-style":"padding: 0","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.temperature,"onUpdate:modelValue":t[2]||(t[2]=t=>e.patientRecordInfo.temperature=t),label:"°C",rules:[e=>e&&!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])]),(0,i.Lk)("div",k,[t[20]||(t[20]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Blood Pressure",-1)),(0,i.Lk)("div",h,[(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.blood_pressure_systole,"onUpdate:modelValue":t[3]||(t[3]=t=>e.patientRecordInfo.blood_pressure_systole=t),style:{width:"80px"},rules:[e=>e&&!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"]),t[19]||(t[19]=(0,i.Lk)("label",{class:"text-primary text-bold q-px-sm"},"/",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.blood_pressure_diastole,"onUpdate:modelValue":t[4]||(t[4]=t=>e.patientRecordInfo.blood_pressure_diastole=t),style:{width:"80px"},rules:[e=>e&&!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])])]),(0,i.Lk)("div",v,[t[21]||(t[21]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Height",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.height,"onUpdate:modelValue":t[5]||(t[5]=t=>e.patientRecordInfo.height=t),label:"cm",rules:[e=>e&&!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])]),(0,i.Lk)("div",_,[t[22]||(t[22]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Weight",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.weight,"onUpdate:modelValue":t[6]||(t[6]=t=>e.patientRecordInfo.weight=t),label:"kg",rules:[e=>e&&!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])]),(0,i.Lk)("div",g,[t[23]||(t[23]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Pulse Rate",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.pulse_rate,"onUpdate:modelValue":t[7]||(t[7]=t=>e.patientRecordInfo.pulse_rate=t),label:"BPM",rules:[e=>!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])]),(0,i.Lk)("div",x,[t[24]||(t[24]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Oxygen Saturation",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:!e.editForm,outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.oxygen_sat,"onUpdate:modelValue":t[8]||(t[8]=t=>e.patientRecordInfo.oxygen_sat=t),label:"%",rules:[e=>!isNaN(e)||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])])]),(0,i.Lk)("div",f,[t[30]||(t[30]=(0,i.Lk)("p",{class:"bg-primary text-white text-center dn-heading"}," Doctors Notes ",-1)),(0,i.Lk)("div",F,[(0,i.Lk)("div",L,[t[26]||(t[26]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Doctor:",-1)),(0,i.bF)(H,{"hide-bottom-space":"",outlined:"",modelValue:e.patientRecordInfo.doctor_id,"onUpdate:modelValue":t[9]||(t[9]=t=>e.patientRecordInfo.doctor_id=t),onFilter:e.userFilterFunction,"option-label":"user_name","option-value":"user_id",options:e.userOptions,"emit-value":"","map-options":"",dense:"",readonly:"","input-style":"padding: 0","input-class":"text-right text-primary"},null,8,["modelValue","onFilter","options"])]),(0,i.Lk)("div",q,[t[27]||(t[27]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Complaint:",-1)),(0,i.bF)(z,{readonly:!e.editForm||e.keySession&&1!==e.keySession.department,autogrow:"",outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.complaint,"onUpdate:modelValue":t[10]||(t[10]=t=>e.patientRecordInfo.complaint=t),"hide-bottom-space":"",rules:[e=>e&&e.length>0||"Field must contain numbers only"]},null,8,["readonly","modelValue","rules"])]),(0,i.Lk)("div",w,[t[28]||(t[28]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Checkup Date:",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:"",autogrow:"",outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.checkup_date,"onUpdate:modelValue":t[11]||(t[11]=t=>e.patientRecordInfo.checkup_date=t)},null,8,["modelValue"])]),(0,i.Lk)("div",V,[t[29]||(t[29]=(0,i.Lk)("p",{class:"text-primary text-weight-bold"},"Next Checkup:",-1)),(0,i.bF)(z,{"hide-bottom-space":"",readonly:"",autogrow:"",outlined:"",dense:"","input-class":"text-right text-primary",modelValue:e.patientRecordInfo.next_checkup,"onUpdate:modelValue":t[13]||(t[13]=t=>e.patientRecordInfo.next_checkup=t),rules:[e=>e&&e.length>0||""],style:{width:"180px"}},(0,i.eX)({_:2},[e.editForm&&e.keySession&&1===e.keySession.department?{name:"append",fn:(0,i.k6)((()=>[(0,i.bF)($,{name:"event",class:"cursor-pointer",color:"primary"},{default:(0,i.k6)((()=>[(0,i.bF)(Y,{"transition-show":"scale","transition-hide":"scale"},{default:(0,i.k6)((()=>[(0,i.bF)(T,{mask:"YYYY-MM-DD",modelValue:e.patientRecordInfo.next_checkup,"onUpdate:modelValue":t[12]||(t[12]=t=>e.patientRecordInfo.next_checkup=t),options:t=>t>=e.checkup_date,rules:[e=>e&&e.length>0||""]},{default:(0,i.k6)((()=>[(0,i.Lk)("div",C,[(0,i.bo)((0,i.bF)(B,{color:"primary",label:"Close",dense:"",flat:""},null,512),[[le]])])])),_:1},8,["modelValue","options","rules"])])),_:1})])),_:1})])),key:"0"}:void 0]),1032,["modelValue","rules"])]),(0,i.Lk)("div",R,[(0,i.bF)(z,{readonly:!e.editForm||e.keySession&&1!==e.keySession.department,autogrow:"",outlined:"",dense:"","input-class":"text-primary",class:"q-mt-md","input-style":"min-height: 100px; max-height: 100px",modelValue:e.patientRecordInfo.checkup_results,"onUpdate:modelValue":t[14]||(t[14]=t=>e.patientRecordInfo.checkup_results=t),placeholder:"Write your notes here"},null,8,["readonly","modelValue"]),(0,i.bF)(B,{icon:"medication",dense:"",outline:"","no-caps":"",color:"primary",label:e.editForm&&e.keySession&&1===e.keySession.department?"Edit Prescription":"View Prescription",class:"q-mt-sm q-px-md",onClick:t[15]||(t[15]=t=>e.isPrescription=!e.isPrescription)},null,8,["label"])])])]),(0,i.Lk)("div",S,[(0,i.Lk)("div",null,[(0,i.Lk)("p",I,[t[31]||(t[31]=(0,i.eW)(" Findings ")),e.editForm&&e.keySession&&1===e.keySession.department&&(0===e.disease.length||""!==e.disease[e.disease.length-1].opd_disease)?((0,i.uX)(),(0,i.Wv)(B,{key:0,dense:"",flat:"",borderless:"",icon:"add_circle",onClick:e.addFinding},null,8,["onClick"])):(0,i.Q3)("",!0)])]),t[32]||(t[32]=(0,i.Lk)("div",null,[(0,i.Lk)("p",{class:"text-center text-grey-7 q-my-none"}," Please input your findings here "),(0,i.Lk)("p",{class:"text-center text-caption text-grey-6 q-my-none"}," If the finding is not on the list, please type the finding and press 'Enter' ")],-1)),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.disease,((t,l)=>((0,i.uX)(),(0,i.CE)("div",{class:"q-ma-md",key:l},[(0,i.bF)(H,{readonly:!e.editForm||e.keySession&&1!==e.keySession.department,options:e.findingOptionsFiltered,onFilter:e.findingsFilter,"use-input":"","new-value-mode":"add-unique",dense:"",outlined:"","input-class":"text-primary",modelValue:t.opd_disease,"onUpdate:modelValue":e=>t.opd_disease=e,"hide-bottom-space":""},{default:(0,i.k6)((()=>[e.editForm&&e.keySession&&1===e.keySession.department?((0,i.uX)(),(0,i.Wv)(B,{key:0,dense:"",flat:"",icon:"delete",borderless:"",onClick:t=>e.removeFinding(l)},null,8,["onClick"])):(0,i.Q3)("",!0)])),_:2},1032,["readonly","options","onFilter","modelValue","onUpdate:modelValue"])])))),128))]),(0,i.Lk)("div",P,[(0,i.Lk)("div",null,[(0,i.Lk)("p",A,[t[33]||(t[33]=(0,i.eW)(" Laboratory Results ")),e.editForm&&e.keySession&&1===e.keySession.department&&(0===e.lab_results.length||""!==e.lab_results[e.lab_results.length-1].lab_result)?((0,i.uX)(),(0,i.Wv)(B,{key:0,dense:"",flat:"",borderless:"",icon:"add_circle",onClick:e.addLabResult},null,8,["onClick"])):(0,i.Q3)("",!0)])]),t[34]||(t[34]=(0,i.Lk)("div",null,[(0,i.Lk)("p",{class:"text-center text-grey-7"}," Please input the lab results here ")],-1)),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.lab_results,((t,l)=>((0,i.uX)(),(0,i.CE)("div",{class:"q-px-md q-mb-md",key:l},[(0,i.bF)(z,{readonly:!e.editForm||e.keySession&&1!==e.keySession.department,autogrow:"",dense:"",outlined:"","input-class":"text-primary",modelValue:t.lab_result,"onUpdate:modelValue":e=>t.lab_result=e,"hide-bottom-space":""},{default:(0,i.k6)((()=>[e.editForm&&e.keySession&&1===e.keySession.department?((0,i.uX)(),(0,i.Wv)(B,{key:0,dense:"",flat:"",icon:"delete",borderless:"",onClick:t=>e.removeLabResult(l)},null,8,["onClick"])):(0,i.Q3)("",!0)])),_:2},1032,["readonly","modelValue","onUpdate:modelValue"])])))),128))])])])),_:1},8,["onSubmit"]),(0,i.bF)(ee,{modelValue:e.isPrescription,"onUpdate:modelValue":t[16]||(t[16]=t=>e.isPrescription=t),persistent:""},{default:(0,i.k6)((()=>[(0,i.bF)(Z,{class:"q-pa-lg",style:{overflow:"hidden",width:"500px"}},{default:(0,i.k6)((()=>[(0,i.Lk)("div",Q,[(0,i.Lk)("h5",U,[(0,i.bF)($,{name:"assignment",color:"primary"}),t[35]||(t[35]=(0,i.eW)(" Prescription "))]),e.editForm&&e.keySession&&1===e.keySession.department&&(0===e.prescription.length||""!==e.prescription[e.prescription.length-1].medicine_name&&""!==e.prescription[e.prescription.length-1].quantity)?((0,i.uX)(),(0,i.Wv)(B,{key:0,outline:"",color:"primary",icon:"add_circle",label:"Add","no-caps":"",style:{"border-radius":"5px"},onClick:e.addPrescription},null,8,["onClick"])):(0,i.Q3)("",!0)]),(0,i.bF)(J,{color:"primary",class:"q-my-md"}),(0,i.Lk)("div",N,[e.editForm&&e.keySession&&1===e.keySession.department?((0,i.uX)(),(0,i.CE)("div",X,t[36]||(t[36]=[(0,i.Lk)("p",{class:"text-grey-7 text-caption"}," If the medicine is not on the list, please input the medicine name and press enter ",-1)]))):(0,i.Q3)("",!0),(0,i.Lk)("div",D,[t[37]||(t[37]=(0,i.Lk)("label",{class:"col text-dark text-bold q-mr-md"},"Medicine Name",-1)),t[38]||(t[38]=(0,i.Lk)("label",{class:"col-2 text-dark text-bold q-mr-md"},"Quantity",-1)),e.editForm&&e.keySession&&1===e.keySession.department?((0,i.uX)(),(0,i.CE)("label",j,"Quantity")):(0,i.Q3)("",!0)]),((0,i.uX)(!0),(0,i.CE)(i.FK,null,(0,i.pI)(e.prescription,((t,l)=>((0,i.uX)(),(0,i.CE)("div",{key:l},[(0,i.Lk)("div",E,[(0,i.bF)(H,{modelValue:t.medicine_name,"onUpdate:modelValue":e=>t.medicine_name=e,dense:"",outlined:"",readonly:!e.editForm||e.keySession&&1!==e.keySession.department,options:e.medicineList,onFilter:e.medicineFilterFunction,"option-label":"medicine_name","option-value":"medicine_name","use-chips":"","use-input":"","emit-value":"","map-options":"","new-value-mode":"add-unique",class:"col q-mr-md"},null,8,["modelValue","onUpdate:modelValue","readonly","options","onFilter"]),(0,i.bF)(z,{readonly:!e.editForm||e.keySession&&1!==e.keySession.department,autogrow:"",dense:"",outlined:"",class:"col-2 q-mr-md","input-class":"text-dark",modelValue:t.quantity,"onUpdate:modelValue":e=>t.quantity=e,"hide-bottom-space":"",rules:[e=>!isNaN(e)||"Numbers only"]},null,8,["readonly","modelValue","onUpdate:modelValue","rules"]),e.editForm&&e.keySession&&1===e.keySession.department?((0,i.uX)(),(0,i.Wv)($,{key:0,name:"delete",color:"negative",class:"col-2",style:{cursor:"pointer"},size:"md",onClick:t=>e.removePrescription(l)},null,8,["onClick"])):(0,i.Q3)("",!0)])])))),128))]),(0,i.Lk)("div",K,[!e.editForm||0===e.prescription.length||""!==e.prescription[e.prescription.length-1].medicine_name&&""!==e.prescription[e.prescription.length-1].quantity?((0,i.uX)(),(0,i.Wv)(B,{key:0,class:"col",icon:"check",label:"Done",color:"primary","no-caps":"",onClick:e.closePrescription},null,8,["onClick"])):(0,i.Q3)("",!0)])])),_:1})])),_:1},8,["modelValue"]),(0,i.bF)(te,{content:e.$options.components.DeletePatientRecordConfirmation},null,8,["content"])])}l(939),l(4520);var M=l(4187),O=l(3877),B=l(662),H=l(834),z=l(6091),T=l(2222),Y=l(455),$=l(7370),G=l(8822),J=l(8564),Z=l(3328),ee=l(3022),te=(l(891),l(4650)),le=l(1408),ie=l(8883);B.A,te.A;var ne=l(4202);const oe={components:{MHCDialog:B.A,DeletePatientRecordConfirmation:H.A},setup(){const e=(0,ee.A)(),t=(0,Y.lq)(),l=(0,Y.rd)();let n=Z.A.getItem("cred");NaN!=n&&null!=n||l.push({name:"login"});let o=(0,M.KR)(!1);J.A.show();let s=(0,M.KR)({}),a=(0,M.KR)([]),d=(0,M.KR)([]),r=(0,M.KR)([]);(0,$.zQ)(t.params.record_id,t.params.department).then((e=>{J.A.hide()}));let u=(0,M.KR)(null);(0,i.wB)((()=>O.cloneDeep($.md.value)),(()=>{o.value=!1,s.value={record_id:t.params.record_id,preliminary_checkup_done_by:{user_id:$.md.value.preliminary_checkup_done_by,user_name:$.md.value.preliminary_checkup_done_by_name},temperature:$.md.value.temperature,blood_pressure_systole:$.md.value.blood_pressure_systole,blood_pressure_diastole:$.md.value.blood_pressure_diastole,height:$.md.value.height,weight:$.md.value.weight,pulse_rate:$.md.value.pulse_rate,oxygen_sat:$.md.value.oxygen_sat,doctor_id:{user_id:$.md.value.doctor_id?$.md.value.doctor_id:n&&n.user_id,user_name:$.md.value.doctor_id?$.md.value.doctor_name:n&&n.first_name+" "+n.last_name+" "+(n.suffix?n.suffix:"")},complaint:$.md.value.complaint,checkup_date:$.md.value.checkup_date,next_checkup:""===$.md.value.next_checkup||"0000-00-00"===$.md.value.next_checkup?$.md.value.checkup_date:$.md.value.next_checkup,checkup_results:$.md.value.checkup_results,status:0},u.value=s.value.checkup_date.replaceAll("-","/")})),(0,i.wB)((()=>O.cloneDeep($.qd.value)),(()=>{a.value=$.qd.value.disease,d.value=$.qd.value.lab_results,r.value=$.qd.value.prescription}));let c=(0,M.KR)([]);const p=(e,t,l)=>{e.length>-1?t((()=>{const t=String(e.toLowerCase());(0,G.i4)(t).then((e=>{if(c.value=[],"success"===e.status){let t=(0,M.KR)([]);t.value=e.data,t.value.forEach((e=>{let t={user_name:e.user_name,user_id:e.id};c.value.push(t)}))}}))})):l()};let m=()=>{J.A.show(),o.value=!1,(0,$.zQ)(t.params.record_id,t.params.department).then((e=>{J.A.hide()}))},y=["Cough","Common Cold","UTI","Physical Injury","Chickenpox","Measles","Asthma","Conjuncvitis","Influenza","Food Poisoning","Hyperthermia","Mumps","Rabies","Skin Condition","Dengue","Allergies","Migraine","Hypertension","Diarrhea","Pneumonia"];y.sort();let b=(0,M.KR)([]);const k=(e,t,l)=>{t((()=>{if(""===e.length)b.value=y;else{const t=e.toLowerCase();b.value=y.filter((e=>e.toLowerCase().indexOf(t)>-1))}}))},h=()=>{a.value.push({opd_disease:"",date_added:s.value.checkup_date})},v=e=>{a.value.splice(e,1)},_=()=>{d.value.push({lab_result:""})},g=e=>{d.value.splice(e,1)},x=()=>{r.value.push({medicine_name:"",quantity:""})},f=e=>{r.value.splice(e,1)},F=()=>{w.value=!1,0===r.value.length||""!==r.value[r.value.length-1].medicine_name&&""!==r.value[r.value.length-1].quantity||f(r.value.length-1)},L=()=>{0!==a.value.length&&""===a.value[a.value.length-1].opd_disease&&v(a.value.length-1),0!==d.value.length&&""===d.value[d.value.length-1].lab_result&&g(d.value.length-1),o.value=!1,s.value.disease=a.value,s.value.lab_results=d.value,s.value.prescription=r.value,"object"===typeof s.value.preliminary_checkup_done_by&&(s.value.preliminary_checkup_done_by=s.value.preliminary_checkup_done_by.user_id),null!=s.value.doctor_id.user_id&&(s.value.doctor_id=s.value.doctor_id.user_id),J.A.show(),(0,$.ti)(s.value,t.params.department).then((t=>{J.A.hide();let l="success"===t.status?0:1;e.notify({type:0===l?"positive":"negative",classes:"text-white",message:0===l?"Patient record edited successfully":"Failed to edit patient record"})}))},q=()=>{(0,T.b)(t.params.record_id,t.params.department),(0,z.o)()};let w=(0,M.KR)(!1),V=(0,M.KR)([]);const C=(e,t,l)=>{e.length>3?t((()=>{const t=String(e.toLowerCase());(0,ne.XO)(t).then((e=>{if(V.value=[],"success"===e.status){let t=(0,M.KR)([]);t.value=e.data,t.value.forEach((e=>{let t={medicine_name:e.generic_name+" - "+e.brand_name};V.value.push(t)}))}}))})):l()};return{RecordDetails:$.md,patientRecordInfo:s,editForm:o,editFunction:L,addFinding:h,addLabResult:_,removeLabResult:g,removeFinding:v,cancelFunction:m,userOptions:c,userFilterFunction:p,openDialog:q,lab_results:d,disease:a,keySession:n,checkup_date:u,isPrescription:w,prescription:r,addPrescription:x,removePrescription:f,medicineList:V,medicineFilterFunction:C,closePrescription:F,findingsFilter:k,findingOptionsFiltered:b}}};var se=l(2968),ae=l(3417),de=l(1244),re=l(9549),ue=l(6067),ce=l(3933),pe=l(8360),me=l(5626),ye=l(45),be=l(3341),ke=l(6915),he=l(7861),ve=l(8657),_e=l(272),ge=l.n(_e);const xe=(0,se.A)(oe,[["render",W],["__scopeId","data-v-6db2efb0"]]),fe=xe;ge()(oe,"components",{QForm:ae.A,QBtn:de.A,QSelect:re.A,QInput:ue.A,QIcon:ce.A,QPopupProxy:pe.A,QDate:me.A,QDialog:ye.A,QCard:be.A,QSeparator:ke.A,QField:he.A}),ge()(oe,"directives",{ClosePopup:ve.A})}}]);