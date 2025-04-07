"use strict";(globalThis["webpackChunkmhoclprmimqs"]=globalThis["webpackChunkmhoclprmimqs"]||[]).push([[571],{6571:(e,a,t)=>{t.r(a),t.d(a,{default:()=>O});var l=t(1347),s=t(7763);const n={class:"dashboard"},i={class:"q-mx-md q-my-lg"},o={class:"flex items-center justify-between q-mb-md"},r={class:"flex justify-between wrap"},u={class:"flex justify-around items-center"},c={class:"q-mb-none text-weight-bold text-white",style:{"font-size":"24px"}},d={class:"cursor-pointer text-white text-center view-graph",style:{"background-color":"#debb2a"}},p={class:"flex justify-around items-center"},b={class:"q-mb-none text-weight-bold text-white",style:{"font-size":"24px"}},v={class:"cursor-pointer text-white text-center view-graph",style:{"background-color":"#2977e8"}},h={class:"flex justify-around items-center"},m={class:"q-mb-none text-weight-bold text-white",style:{"font-size":"24px"}},k={class:"cursor-pointer text-white text-center view-graph",style:{"background-color":"#d75555"}},y={class:"flex justify-around items-center"},g={class:"q-mb-none text-weight-bold text-white",style:{"font-size":"24px"}},x={class:"cursor-pointer text-white text-center view-graph",style:{"background-color":"#55a15e"}},f={class:"q-px-md",id:"myChart",ref:"canvas"};function w(e,a,t,w,_,q){const R=(0,l.g2)("q-select"),A=(0,l.g2)("q-icon"),L=(0,l.g2)("q-card");return(0,l.uX)(),(0,l.CE)("div",n,[(0,l.Lk)("div",i,[(0,l.Lk)("div",o,[a[6]||(a[6]=(0,l.Lk)("h5",{class:"text-weight-bold text-dark q-my-none"},"DASHBOARD",-1)),(0,l.bF)(R,{class:"q-mb-md q-mr-sm",outlined:"",dense:"",modelValue:e.selected,"onUpdate:modelValue":[a[0]||(a[0]=a=>e.selected=a),a[1]||(a[1]=a=>e.setDashboard())],options:e.options,style:{width:"150px"}},null,8,["modelValue","options"])]),(0,l.Lk)("div",r,[(0,l.bF)(L,{clickable:"",square:"",class:"q-pt-md dashboard-card",style:{"background-color":"#f1d356"},onClick:a[2]||(a[2]=()=>{e.chartToRender=1,e.renderChart()})},{default:(0,l.k6)((()=>[(0,l.Lk)("div",u,[(0,l.Lk)("div",null,[(0,l.Lk)("p",c,(0,s.v_)(e.DashboardData.patient_count),1),a[7]||(a[7]=(0,l.Lk)("p",{class:"text-weight-bold text-white",style:{"font-size":"16px"}},"New Patients",-1))]),(0,l.bF)(A,{size:"100px",name:"group",class:"new-patients-card-icon"})]),(0,l.Lk)("div",d,[a[8]||(a[8]=(0,l.eW)(" View Graph ")),(0,l.bF)(A,{name:"east"})])])),_:1}),(0,l.bF)(L,{clickable:"",square:"",class:"q-pt-md dashboard-card",style:{"background-color":"#4d96ff"},onClick:a[3]||(a[3]=()=>{e.chartToRender=2,e.renderChart()})},{default:(0,l.k6)((()=>[(0,l.Lk)("div",p,[(0,l.Lk)("div",null,[(0,l.Lk)("p",b,(0,s.v_)(e.totalinStockMedicine),1),a[9]||(a[9]=(0,l.Lk)("p",{class:"text-weight-bold text-white",style:{"font-size":"16px"}},"Medicines",-1))]),(0,l.bF)(A,{size:"100px",name:"mdi-pill",class:"medicines-card-icon"})]),(0,l.Lk)("div",v,[a[10]||(a[10]=(0,l.eW)(" View Graph ")),(0,l.bF)(A,{name:"east"})])])),_:1}),(0,l.bF)(L,{clickable:"",square:"",class:"q-pt-md dashboard-card",style:{"background-color":"#ff6b6b"},onClick:a[4]||(a[4]=()=>{e.chartToRender=3,e.renderChart()})},{default:(0,l.k6)((()=>[(0,l.Lk)("div",h,[(0,l.Lk)("div",null,[(0,l.Lk)("p",m,(0,s.v_)(e.totalinStockSupply),1),a[11]||(a[11]=(0,l.Lk)("p",{class:"text-weight-bold text-white",style:{"font-size":"16px"}},"Supplies",-1))]),(0,l.bF)(A,{size:"100px",name:"mdi-needle",class:"supplies-card-icon"})]),(0,l.Lk)("div",k,[a[12]||(a[12]=(0,l.eW)(" View Graph ")),(0,l.bF)(A,{name:"east"})])])),_:1}),(0,l.bF)(L,{clickable:"",square:"",class:"q-pt-md dashboard-card",style:{"background-color":"#6bcb77"},onClick:a[5]||(a[5]=()=>{e.chartToRender=4,e.renderChart()})},{default:(0,l.k6)((()=>[(0,l.Lk)("div",y,[(0,l.Lk)("div",null,[(0,l.Lk)("p",g,(0,s.v_)(e.DashboardData.disease_count),1),a[13]||(a[13]=(0,l.Lk)("p",{class:"text-weight-bold text-white",style:{"font-size":"16px"}},"Disease",-1))]),(0,l.bF)(A,{size:"100px",name:"monitor_heart",class:"disease-card-icon"})]),(0,l.Lk)("div",x,[a[14]||(a[14]=(0,l.eW)(" View Graph ")),(0,l.bF)(A,{name:"east"})])])),_:1})]),(0,l.Lk)("div",{class:"flex items-center q-mt-md chartDiv",style:(0,s.Tr)({height:e.$q.screen.height-350+"px"})},[(0,l.Lk)("canvas",f,null,512)],4)])])}t(939),t(4520);var _=t(4187),q=t(3877);let R=(0,_.KR)([]);var A=t(3328),L=t(8564),D=t(8883),P=(t(662),t(6091)),C=t(2222),z=t(9669),K=t(455);const S={setup(){const e=(0,K.rd)();let a=A.A.getItem("cred");a||e.push({name:"login"});let t=(0,_.KR)("This Week"),s=["This Week","This Month","This Year"];t.value,a&&a.department;(0,q.throttle)((()=>{}),500);const n=()=>{};let i=(0,_.KR)([]);NaN==a&&null==a||(a&&1===a.department?i.value=["OPD"]:a&&2===a.department?i.value=["Dental"]:a&&3===a.department?i.value=["Prenatal"]:i.value=["OPD","Dental","Prenatal","Immunization"]);let o=(0,_.KR)(i.value[0]),r=(0,_.KR)(null);"OPD"===o.value?r.value=1:"Dental"===o.value?r.value=2:"Prenatal"===o.value?r.value=3:"Immunization"===o.value&&(r.value=7),(0,D.SP)(r.value);const u=()=>{d.value=null,p.value=[],b.value=[],"OPD"===o.value?r.value=1:"Dental"===o.value?r.value=2:"Prenatal"===o.value?r.value=3:"Immunization"===o.value&&(r.value=7),(0,D.SP)(r.value)},c=e=>{(0,C.b)(e),(0,P.o)()};let d=(0,_.KR)(null),p=(0,_.KR)([]),b=(0,_.KR)([]);(0,l.wB)((()=>q.cloneDeep(D.uQ.value)),(()=>{D.uQ.value.forEach((e=>{1===e.is_current?d.value=e:0===e.is_current&&1===e.is_priority?p.value.push(e):0===e.is_current&&0===e.is_priority&&b.value.push(e)}))}));const v=()=>{L.A.show(),(0,D.P5)({current_patient:null!==d.value?d.value.queue_id:null,next_patient:p.value[0].queue_id}).then((e=>{L.A.hide(),p.value=[],b.value=[],(0,D.SP)(r.value)}))},h=()=>{L.A.show(),(0,D.P5)({current_patient:null!==d.value?d.value.queue_id:null,next_patient:b.value[0].queue_id}).then((e=>{L.A.hide(),p.value=[],b.value=[],(0,D.SP)(r.value)}))};let m=(0,_.KR)(1),k=(0,_.KR)({}),y=(0,_.KR)({}),g=(0,_.KR)({}),x=(0,_.KR)({}),f=(0,_.KR)(0),w=(0,_.KR)(0);(0,l.wB)((()=>q.cloneDeep(R.value)),(()=>{k.value={type:"bar",labels:["OPD","Dental","Prenatal","Immunization"],label:"Number of New Records",data:[R.value.opd_count,R.value.dental_count,R.value.prenatal_count,R.value.immunization_count]},R.value.medicine_count.forEach((e=>{f.value=f.value+e.in_stock}));let e=[];R.value.medicine_count.forEach((a=>{e.push(a.med_classification)}));let a=[];R.value.medicine_count.forEach((e=>{a.push(e.in_stock)})),y.value={type:"bar",labels:e,label:"Number of Medicines in stock",data:a},R.value.supply_count.forEach((e=>{w.value=w.value+e.in_stock}));let t=[];R.value.supply_count.forEach((e=>{t.push(e.supply_type)}));let l=[];R.value.supply_count.forEach((e=>{l.push(e.in_stock)})),g.value={type:"bar",labels:t,label:"Number of Supplies in stock",data:l};let s=[];R.value.diseases.forEach((e=>{s.push(e.opd_disease)}));let n=[];R.value.diseases.forEach((e=>{n.push(e.count)})),x.value={type:"bar",labels:s,label:"Number of Patients afflicted",data:n}}));const S=(0,_.KR)(null),F=(0,q.throttle)((()=>{S.value&&S.value.destroy();const e=document.getElementById("myChart");1===m.value?S.value=new z.Ay(e,{type:k.value.type,data:{labels:k.value.labels,datasets:[{label:k.value.label,data:k.value.data,backgroundColor:["rgba(222, 187, 42, 0.5)","rgba(41, 119, 232, 0.5)","rgba(215, 85, 85, 0.5)","rgba(85, 161, 94, 0.5)"],borderWidth:1}]},options:{maintainAspectRatio:!1,animation:!1,scales:{y:{beginAtZero:!0}}}}):2===m.value?S.value=new z.Ay(e,{type:y.value.type,data:{labels:y.value.labels,datasets:[{label:y.value.label,data:y.value.data,backgroundColor:["rgba(222, 187, 42, 0.5)","rgba(41, 119, 232, 0.5)","rgba(215, 85, 85, 0.5)","rgba(85, 161, 94, 0.5)"],borderWidth:1}]},options:{maintainAspectRatio:!1,animation:!1,scales:{y:{beginAtZero:!0}}}}):3===m.value?S.value=new z.Ay(e,{type:g.value.type,data:{labels:g.value.labels,datasets:[{label:g.value.label,data:g.value.data,backgroundColor:["rgba(222, 187, 42, 0.5)","rgba(41, 119, 232, 0.5)","rgba(215, 85, 85, 0.5)","rgba(85, 161, 94, 0.5)"],borderWidth:1}]},options:{maintainAspectRatio:!1,animation:!1,scales:{y:{beginAtZero:!0}}}}):4===m.value?S.value=new z.Ay(e,{type:x.value.type,data:{labels:x.value.labels,datasets:[{label:x.value.label,data:x.value.data,backgroundColor:["rgba(222, 187, 42, 0.5)","rgba(41, 119, 232, 0.5)","rgba(215, 85, 85, 0.5)","rgba(85, 161, 94, 0.5)"],borderWidth:1}]},options:{maintainAspectRatio:!1,animation:!1,scales:{y:{beginAtZero:!0}}}}):S.value=new z.Ay(e,{type:"bar",data:{labels:["Red","Blue","Yellow","Green","Purple","Orange"],datasets:[{label:"# of Votes",data:[12,19,3,5,2,3],borderWidth:1}]},options:{maintainAspectRatio:!1,animation:!1,scales:{y:{beginAtZero:!0}}}})}),0);return{selected:t,options:s,DashboardData:R,setDashboard:n,departmentList:i,selectedDepartment:o,getDepartments:u,QueueSpecific:D.uQ,keySession:a,removeFromQueue:c,chart:S,renderChart:F,chartToRender:m,totalinStockMedicine:f,totalinStockSupply:w,currentPatient:d,priorityPatients:p,otherPatients:b,callInNextPriority:v,callInNextPatient:h}}};var F=t(2968),T=t(9549),E=t(3341),W=t(3933),I=t(6067),N=t(272),Q=t.n(N);const V=(0,F.A)(S,[["render",w]]),O=V;Q()(S,"components",{QSelect:T.A,QCard:E.A,QIcon:W.A,QInput:I.A})}}]);