"use strict";(globalThis["webpackChunkmhoclprmimqs"]=globalThis["webpackChunkmhoclprmimqs"]||[]).push([[599],{7599:(e,l,a)=>{a.r(l),a.d(l,{default:()=>Pe});var t=a(1347),s=a(7763);const d={class:"medicine-inventory"},o={class:"flex items-center q-px-md q-pt-none"},n={class:"q-px-md"},u={class:"flex justify-between items-center"},i={class:"flex"},p={class:"flex justify-between q-px-sm"},r={class:"flex items-center"},c={class:"q-mt-lg"},m={class:"flex justify-between items-center q-mt-sm"},y={class:"q-mt-lg"},b={class:"flex justify-between items-center q-mt-sm"},k={class:"q-mt-lg"},_={class:"flex justify-between items-center q-mt-sm"},v={class:"flex justify-between items-center q-mt-lg q-mb-md"},f={class:"q-mt-lg"},g={class:"q-pa-lg"},x={class:"flex justify-end"},h={class:"text-primary text-weight-bold text-24 text-center q-mb-xl"},S={class:"row q-mb-md"},q={class:"col"},F={class:"col"},V={class:"row q-mt-lg q-mb-md"},w={class:"col"},D={class:"col"},L={class:"row q-mt-lg q-mb-md"},R={class:"col"},A={class:"col"},Y={class:"col"},C={class:"flex justify-center items-center q-mt-xl q-mb-lg"},U={class:"q-pa-lg"},M={class:"flex justify-end"},Q={class:"text-primary text-weight-bold text-24 text-center q-mb-xl"},E={class:"row q-mt-sm"},W={class:"col q-mr-md"},N={class:"col-5"},T={key:0},I={class:"q-mb-md"},K={class:"row"},j={key:0,class:"col-1 text-dark",style:{visibility:"hidden"}},P={class:"row q-mb-sm"},O={class:"q-my-md table"},B={class:"q-pa-lg"},X={class:"flex justify-end"},z={class:"text-primary text-weight-bold text-24 text-center q-mb-xl"},G={class:"row q-mb-md"},H={class:"col"},$={class:"col"},J={class:"col"},Z={class:"row q-mt-lg q-mb-md"},ee={class:"col"},le={class:"col"},ae={class:"row q-mt-lg q-mb-md"},te={class:"col"},se={class:"col"},de={class:"col"},oe={class:"flex justify-center items-center q-mt-xl q-mb-lg"};function ne(e,l,a,ne,ue,ie){const pe=(0,t.g2)("q-btn"),re=(0,t.g2)("q-icon"),ce=(0,t.g2)("q-input"),me=(0,t.g2)("q-select"),ye=(0,t.g2)("q-checkbox"),be=(0,t.g2)("q-date"),ke=(0,t.g2)("q-popup-proxy"),_e=(0,t.g2)("q-card"),ve=(0,t.g2)("q-dialog"),fe=(0,t.g2)("q-form"),ge=(0,t.g2)("q-separator"),xe=(0,t.g2)("q-td"),he=(0,t.g2)("q-item-section"),Se=(0,t.g2)("q-item"),qe=(0,t.g2)("q-list"),Fe=(0,t.g2)("q-menu"),Ve=(0,t.g2)("q-th"),we=(0,t.g2)("q-table"),De=(0,t.g2)("MHCDialog"),Le=(0,t.gN)("close-popup");return(0,t.uX)(),(0,t.CE)("div",d,[(0,t.Lk)("div",o,[(0,t.bF)(pe,{round:"",outline:"",dense:"",icon:"eva-arrow-back-outline",color:"dark",class:"q-mr-md",onClick:l[0]||(l[0]=l=>e.$router.go(-1))}),l[47]||(l[47]=(0,t.Lk)("h5",{class:"text-dark text-weight-bold"},"SUPPLY INVENTORY",-1))]),(0,t.Lk)("div",n,[(0,t.Lk)("div",u,[(0,t.Lk)("div",i,[(0,t.bF)(ce,{outlined:"",dense:"","input-style":{color:"#525252"},modelValue:e.searchString,"onUpdate:modelValue":l[1]||(l[1]=l=>e.searchString=l)},{prepend:(0,t.k6)((()=>[(0,t.bF)(re,{name:"mdi-account-search-outline"})])),_:1},8,["modelValue"]),(0,t.bF)(me,{modelValue:e.selectedSearchBy,"onUpdate:modelValue":l[2]||(l[2]=l=>e.selectedSearchBy=l),options:e.searchBy,outlined:"",dense:"",label:"Search By:",class:"mhc-select-200"},null,8,["modelValue","options"]),(0,t.bF)(pe,{outline:"",label:"Filters","no-caps":"","icon-right":"eva-funnel-outline",color:"primary",class:"q-mx-lg button-120",onClick:l[20]||(l[20]=l=>e.showFilterModal=!0)},{default:(0,t.k6)((()=>[(0,t.bF)(ve,{modelValue:e.showFilterModal,"onUpdate:modelValue":l[19]||(l[19]=l=>e.showFilterModal=l)},{default:(0,t.k6)((()=>[(0,t.bF)(_e,{class:"width-450 dialog-card q-pa-lg"},{default:(0,t.k6)((()=>[(0,t.Lk)("div",p,[(0,t.Lk)("div",null,[l[48]||(l[48]=(0,t.Lk)("label",{class:"text-primary text-weight-bold q-mb-sm"}," In Stock ",-1)),(0,t.Lk)("div",r,[(0,t.bF)(ce,{dense:"",mask:"######",outlined:"",hint:"From",class:"q-mr-sm",style:{width:"5rem"},modelValue:e.inStock[0],"onUpdate:modelValue":l[3]||(l[3]=l=>e.inStock[0]=l),rules:[e=>0===e||e&&!isNaN(e)||""]},null,8,["modelValue","rules"]),(0,t.bF)(ce,{dense:"",mask:"######",outlined:"",hint:"To",class:"q-ml-sm",style:{width:"5rem"},modelValue:e.inStock[1],"onUpdate:modelValue":l[4]||(l[4]=l=>e.inStock[1]=l),rules:[l=>0===l||l&&!isNaN(l)&&l>=e.inStock[0]||""]},null,8,["modelValue","rules"])])]),(0,t.Lk)("div",null,[l[49]||(l[49]=(0,t.Lk)("label",{class:"text-primary text-weight-bold"},"Status ",-1)),((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(e.statusList,((a,s)=>((0,t.uX)(),(0,t.CE)("div",{key:s},[(0,t.bF)(ye,{modelValue:e.status_array_model,"onUpdate:modelValue":l[5]||(l[5]=l=>e.status_array_model=l),val:s,label:a,class:"text-dark"},null,8,["modelValue","val","label"])])))),128))])]),(0,t.Lk)("div",c,[l[53]||(l[53]=(0,t.Lk)("label",{class:"text-primary text-weight-bold"},"Manufacturing Date",-1)),(0,t.Lk)("div",m,[(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",hint:"From",class:"width-150",modelValue:e.mfgDate[0],"onUpdate:modelValue":l[7]||(l[7]=l=>e.mfgDate[0]=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{modelValue:e.mfgDate[0],"onUpdate:modelValue":l[6]||(l[6]=l=>e.mfgDate[0]=l),options:e=>e<=(new Date).toISOString().split("T")[0].replaceAll("-","/")},{default:(0,t.k6)((()=>[l[50]||(l[50]=(0,t.Lk)("template",null,null,-1)),(0,t.bo)((0,t.bF)(pe,{label:"done",dense:"",color:"primary"},null,512),[[Le]])])),_:1},8,["modelValue","options"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),l[52]||(l[52]=(0,t.Lk)("div",{class:"line"},null,-1)),(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",hint:"To",class:"width-150",modelValue:e.mfgDate[1],"onUpdate:modelValue":l[9]||(l[9]=l=>e.mfgDate[1]=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{modelValue:e.mfgDate[1],"onUpdate:modelValue":l[8]||(l[8]=l=>e.mfgDate[1]=l),options:l=>l>=e.mfgDate[0]&&l<=(new Date).toISOString().split("T")[0].replaceAll("-","/")},{default:(0,t.k6)((()=>[l[51]||(l[51]=(0,t.Lk)("template",null,null,-1)),(0,t.bo)((0,t.bF)(pe,{label:"done",dense:"",color:"primary"},null,512),[[Le]])])),_:1},8,["modelValue","options"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])]),(0,t.Lk)("div",y,[l[57]||(l[57]=(0,t.Lk)("label",{class:"text-primary text-weight-bold"},"Expiry Date",-1)),(0,t.Lk)("div",b,[(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",hint:"From",class:"width-150",modelValue:e.expDate[0],"onUpdate:modelValue":l[11]||(l[11]=l=>e.expDate[0]=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{modelValue:e.expDate[0],"onUpdate:modelValue":l[10]||(l[10]=l=>e.expDate[0]=l)},{default:(0,t.k6)((()=>[l[54]||(l[54]=(0,t.Lk)("template",null,null,-1)),(0,t.bo)((0,t.bF)(pe,{label:"done",dense:"",color:"primary"},null,512),[[Le]])])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),l[56]||(l[56]=(0,t.Lk)("div",{class:"line"},null,-1)),(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",hint:"To",class:"width-150",modelValue:e.expDate[1],"onUpdate:modelValue":l[13]||(l[13]=l=>e.expDate[1]=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{modelValue:e.expDate[1],"onUpdate:modelValue":l[12]||(l[12]=l=>e.expDate[1]=l),options:l=>l>=e.expDate[0]},{default:(0,t.k6)((()=>[l[55]||(l[55]=(0,t.Lk)("template",null,null,-1)),(0,t.bo)((0,t.bF)(pe,{label:"done",dense:"",color:"primary"},null,512),[[Le]])])),_:1},8,["modelValue","options"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])]),(0,t.Lk)("div",k,[l[61]||(l[61]=(0,t.Lk)("label",{class:"text-primary text-weight-bold"},"Date Added",-1)),(0,t.Lk)("div",_,[(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",hint:"From",class:"width-150",modelValue:e.dateAdded[0],"onUpdate:modelValue":l[15]||(l[15]=l=>e.dateAdded[0]=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{modelValue:e.dateAdded[0],"onUpdate:modelValue":l[14]||(l[14]=l=>e.dateAdded[0]=l),options:e=>e<=(new Date).toISOString().split("T")[0].replaceAll("-","/")},{default:(0,t.k6)((()=>[l[58]||(l[58]=(0,t.Lk)("template",null,null,-1)),(0,t.bo)((0,t.bF)(pe,{label:"done",dense:"",color:"primary"},null,512),[[Le]])])),_:1},8,["modelValue","options"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),l[60]||(l[60]=(0,t.Lk)("div",{class:"line"},null,-1)),(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",hint:"To",class:"width-150",modelValue:e.dateAdded[1],"onUpdate:modelValue":l[17]||(l[17]=l=>e.dateAdded[1]=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{modelValue:e.dateAdded[1],"onUpdate:modelValue":l[16]||(l[16]=l=>e.dateAdded[1]=l),options:l=>l>=e.dateAdded[0]&&l<=(new Date).toISOString().split("T")[0].replaceAll("-","/")},{default:(0,t.k6)((()=>[l[59]||(l[59]=(0,t.Lk)("template",null,null,-1)),(0,t.bo)((0,t.bF)(pe,{label:"done",dense:"",color:"primary"},null,512),[[Le]])])),_:1},8,["modelValue","options"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])]),(0,t.Lk)("div",v,[(0,t.bF)(pe,{outline:"",color:"primary",label:"Reset","no-caps":"",class:"button-80",onClick:e.resetFilter},null,8,["onClick"]),(0,t.bF)(pe,{dense:"",color:"primary",label:"Done","no-caps":"",class:"button-80",onClick:l[18]||(l[18]=l=>e.showFilterModal=!e.showFilterModal)})])])),_:1})])),_:1},8,["modelValue"])])),_:1}),(0,t.bF)(pe,{color:"primary",label:"Search","no-caps":"","icon-right":"eva-search-outline",class:"button-120",onClick:e.getRecords},null,8,["onClick"])])]),(0,t.Lk)("div",f,[e.keySession&&4===e.keySession.department&&3!==e.keySession.permission_level?((0,t.uX)(),(0,t.Wv)(pe,{key:0,onClick:l[21]||(l[21]=l=>e.isAddNewSupplyStock=!0),outline:"",label:"Add New Supply Stock","icon-right":"inventory","no-caps":"",color:"primary",class:"q-mr-xs"})):(0,t.Q3)("",!0),e.keySession&&4===e.keySession.department&&3!==e.keySession.permission_level?((0,t.uX)(),(0,t.Wv)(pe,{key:1,outline:"",label:"Release Supplies","icon-right":"fa fa-boxes-packing","no-caps":"",color:"primary",class:"q-ml-xs",onClick:l[22]||(l[22]=l=>e.isSupplyRelease=!e.isSupplyRelease)})):(0,t.Q3)("",!0)]),(0,t.bF)(ve,{modelValue:e.isAddNewSupplyStock,"onUpdate:modelValue":l[32]||(l[32]=l=>e.isAddNewSupplyStock=l),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(_e,{style:{"min-width":"750px"}},{default:(0,t.k6)((()=>[(0,t.Lk)("div",g,[(0,t.Lk)("div",x,[(0,t.bo)((0,t.bF)(pe,{dense:"",color:"negative",size:"0.375rem",icon:"eva-close-outline"},null,512),[[Le]])]),(0,t.Lk)("p",h,[(0,t.bF)(re,{name:"inventory",class:"q-mr-xs q-gutter-xs"}),l[62]||(l[62]=(0,t.eW)(" ADD SUPPLY RECORD "))]),(0,t.bF)(fe,{onSubmit:e.addSupplyRecord,onReset:e.onReset},{default:(0,t.k6)((()=>[(0,t.Lk)("div",S,[(0,t.Lk)("div",q,[l[63]||(l[63]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Supply Name "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. Baygon Gloves",class:"q-mr-md q-mt-xs",modelValue:e.newSupplyRecord.supply_name,"onUpdate:modelValue":l[23]||(l[23]=l=>e.newSupplyRecord.supply_name=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])]),(0,t.Lk)("div",F,[l[64]||(l[64]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Supply Type "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. Glove",class:"q-mt-xs",modelValue:e.newSupplyRecord.supply_type,"onUpdate:modelValue":l[24]||(l[24]=l=>e.newSupplyRecord.supply_type=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])])]),(0,t.Lk)("div",V,[(0,t.Lk)("div",w,[l[65]||(l[65]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Manufacturing Date "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",readonly:"",outlined:"",placeholder:"YYYY-MM-DD",class:"q-mt-xs q-mr-md",modelValue:e.newSupplyRecord.mfg_date,"onUpdate:modelValue":l[26]||(l[26]=l=>e.newSupplyRecord.mfg_date=l),rules:[e=>e&&e.length>0||"Required field"]},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{mask:"YYYY-MM-DD",label:"YYYY-MM-DD",modelValue:e.newSupplyRecord.mfg_date,"onUpdate:modelValue":l[25]||(l[25]=l=>e.newSupplyRecord.mfg_date=l),options:e=>e<=(new Date).toISOString().split("T")[0].replaceAll("-","/")},null,8,["modelValue","options"])])),_:1})])),_:1})])),_:1},8,["modelValue","rules"])]),(0,t.Lk)("div",D,[l[66]||(l[66]=(0,t.Lk)("label",{class:"text-dark"},"Expiry Date",-1)),(0,t.bF)(ce,{readonly:"",dense:"",outlined:"",placeholder:"YYYY-MM-DD",class:"q-mt-xs",modelValue:e.newSupplyRecord.exp_date,"onUpdate:modelValue":l[28]||(l[28]=l=>e.newSupplyRecord.exp_date=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{mask:"YYYY-MM-DD",label:"YYYY-MM-DD",modelValue:e.newSupplyRecord.exp_date,"onUpdate:modelValue":l[27]||(l[27]=l=>e.newSupplyRecord.exp_date=l)},null,8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])]),(0,t.Lk)("div",L,[(0,t.Lk)("div",R,[l[67]||(l[67]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Quantity Received "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{mask:"#######",dense:"",outlined:"",placeholder:"ex. 350",class:"q-mr-md q-mt-xs",modelValue:e.newSupplyRecord.quantity,"onUpdate:modelValue":l[29]||(l[29]=l=>e.newSupplyRecord.quantity=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])]),(0,t.Lk)("div",A,[l[68]||(l[68]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Quantity Type "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. piece",class:"q-mr-md q-mt-xs",modelValue:e.newSupplyRecord.quantity_type,"onUpdate:modelValue":l[30]||(l[30]=l=>e.newSupplyRecord.quantity_type=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])]),(0,t.Lk)("div",Y,[l[69]||(l[69]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Source "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. DOH",class:"q-mt-xs",modelValue:e.newSupplyRecord.procured_by,"onUpdate:modelValue":l[31]||(l[31]=l=>e.newSupplyRecord.procured_by=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])])]),(0,t.Lk)("div",C,[(0,t.bF)(pe,{color:"primary",label:"Submit",type:"submit","no-caps":"",class:"button-120 q-mr-xl"}),(0,t.bF)(pe,{outline:"",color:"primary",label:"Reset",type:"reset","no-caps":"",class:"button-120"})])])),_:1},8,["onSubmit","onReset"])])])),_:1})])),_:1},8,["modelValue"]),(0,t.bF)(ve,{modelValue:e.isSupplyRelease,"onUpdate:modelValue":l[35]||(l[35]=l=>e.isSupplyRelease=l),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(_e,{style:{"min-width":"500px","max-width":"750px"}},{default:(0,t.k6)((()=>[(0,t.Lk)("div",U,[(0,t.Lk)("div",M,[(0,t.bo)((0,t.bF)(pe,{dense:"",color:"negative",size:"0.375rem",icon:"eva-close-outline"},null,512),[[Le]])]),(0,t.Lk)("p",Q,[(0,t.bF)(re,{name:"fa fa-boxes-packing",class:"q-mr-xs q-gutter-xs"}),l[70]||(l[70]=(0,t.eW)(" RELEASE SUPPLIES "))]),(0,t.bF)(fe,{onSubmit:e.addSupplyRelease},{default:(0,t.k6)((()=>[(0,t.Lk)("div",E,[(0,t.Lk)("div",W,[l[71]||(l[71]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Personnel ID "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(me,{outlined:"","hide-bottom-space":"",modelValue:e.supplyReleaseDetails.user_id,"onUpdate:modelValue":[l[33]||(l[33]=l=>e.supplyReleaseDetails.user_id=l),e.findDepartment],onFilter:e.userFilterFunction,"option-label":"user_name","option-value":"user_id",options:e.userOptions,"use-input":"","emit-value":"","map-options":"",dense:"","input-style":"padding: 0","input-class":"text-right text-primary",rules:[e=>e&&(e.length>0||!isNaN(e))||"Required field"]},null,8,["modelValue","onFilter","options","rules","onUpdate:modelValue"])]),(0,t.Lk)("div",N,[l[72]||(l[72]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Department "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(me,{"hide-bottom-space":"",disable:"",options:e.filtersDepartment,dense:"",outlined:"",modelValue:e.supplyReleaseDetails.department,"onUpdate:modelValue":l[34]||(l[34]=l=>e.supplyReleaseDetails.department=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["options","modelValue","rules"])])]),(0,t.bF)(ge,{class:"q-my-md",color:"primary"}),e.supplyReleaseDetails.user_id&&e.supplyReleaseDetails.department?((0,t.uX)(),(0,t.CE)("div",T,[(0,t.Lk)("div",I,[(0,t.bF)(pe,{label:"Add",icon:"add_circle",color:"primary",outline:"","no-caps":"",onClick:e.addSupply},null,8,["onClick"])]),(0,t.Lk)("div",K,[l[73]||(l[73]=(0,t.Lk)("label",{class:"col text-dark text-bold q-mr-md"},"Supply Name",-1)),l[74]||(l[74]=(0,t.Lk)("label",{class:"col-2 text-dark text-bold q-mr-md"},"Quantity",-1)),e.supplyReleaseDetails.supplies_array.length>1?((0,t.uX)(),(0,t.CE)("label",j,"Quantity")):(0,t.Q3)("",!0)]),((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(e.supplyReleaseDetails.supplies_array,((l,a)=>((0,t.uX)(),(0,t.CE)("div",{key:a},[(0,t.Lk)("div",P,[(0,t.bF)(me,{modelValue:l.supply_id,"onUpdate:modelValue":e=>l.supply_id=e,dense:"",outlined:"",options:e.supplyList,onFilter:e.supplyFilterFunction,"option-label":"supply_name","option-value":"supply_id","use-input":"","emit-value":"","map-options":"","new-value-mode":"add-unique","hide-bottom-space":"",class:"col q-mr-md",rules:[e=>e||""]},null,8,["modelValue","onUpdate:modelValue","options","onFilter","rules"]),(0,t.bF)(ce,{mask:"######",dense:"",outlined:"",class:"col-2 q-mr-md","input-class":"text-dark",modelValue:l.quantity,"onUpdate:modelValue":e=>l.quantity=e,"hide-bottom-space":"",rules:[e=>e&&!isNaN(e)||""]},null,8,["modelValue","onUpdate:modelValue","rules"]),e.supplyReleaseDetails.supplies_array.length>1?((0,t.uX)(),(0,t.Wv)(re,{key:0,name:"delete",color:"negative",class:"col-1 cursor-pointer",size:"30px",onClick:l=>e.removeSupply(a)},null,8,["onClick"])):(0,t.Q3)("",!0)])])))),128)),(0,t.Lk)("div",null,[(0,t.bF)(pe,{label:"Submit",type:"submit","no-caps":"",color:"primary"})])])):(0,t.Q3)("",!0)])),_:1},8,["onSubmit"])])])),_:1})])),_:1},8,["modelValue"]),(0,t.Lk)("div",O,[(0,t.bF)(we,{columns:e.columns,rows:e.SuppliesList,pagination:{rowsPerPage:10},"rows-per-page-options":[5,10,15,20,0],flat:"",dense:"",class:"mhc-table"},{"body-cell-in_stock":(0,t.k6)((e=>[(0,t.bF)(xe,{props:e,style:(0,s.Tr)(e.row.quantity-e.row.quantity_released<=100?"color: red":"")},{default:(0,t.k6)((()=>[(0,t.eW)((0,s.v_)(e.row.quantity-e.row.quantity_released),1)])),_:2},1032,["props","style"])])),"body-cell-exp_date":(0,t.k6)((l=>[(0,t.bF)(xe,{props:l,class:(0,s.C4)(e.getExpDateClass(l.row))},{default:(0,t.k6)((()=>[(0,t.eW)((0,s.v_)(l.row.exp_date),1)])),_:2},1032,["props","class"])])),"body-cell-action":(0,t.k6)((a=>[(0,t.bF)(xe,{props:a},{default:(0,t.k6)((()=>[(0,t.bF)(pe,{dense:"",color:"primary",label:"Action","icon-right":"more_vert","no-caps":"",unelevated:"",class:"button-100 action-btn"},{default:(0,t.k6)((()=>[(0,t.bF)(Fe,{"transition-show":"jump-down","transition-hide":"jump-up",class:"width-200"},{default:(0,t.k6)((()=>[(0,t.bF)(qe,{separator:"",dense:""},{default:(0,t.k6)((()=>[(0,t.bF)(Se,{clickable:"",class:"drop-list",onClick:l=>e.$router.push({name:"supply-inventory-details",params:{supply_id:a.row.supply_id}})},{default:(0,t.k6)((()=>[(0,t.bF)(he,null,{default:(0,t.k6)((()=>l[75]||(l[75]=[(0,t.eW)("View Details")]))),_:1}),(0,t.bF)(he,{avatar:""},{default:(0,t.k6)((()=>[(0,t.bF)(re,{size:"xs",name:"eva-eye-outline"})])),_:1})])),_:2},1032,["onClick"]),e.keySession&&3!==e.keySession.permission_level?((0,t.uX)(),(0,t.Wv)(Se,{key:0,clickable:"",class:"drop-list",onClick:l=>e.editRecordModal(a.row)},{default:(0,t.k6)((()=>[(0,t.bF)(he,null,{default:(0,t.k6)((()=>l[76]||(l[76]=[(0,t.eW)("Edit Details")]))),_:1}),(0,t.bF)(he,{avatar:""},{default:(0,t.k6)((()=>[(0,t.bF)(re,{size:"xs",name:"eva-edit-outline"})])),_:1})])),_:2},1032,["onClick"])):(0,t.Q3)("",!0),e.keySession&&3!==e.keySession.permission_level?((0,t.uX)(),(0,t.Wv)(Se,{key:1,clickable:"",class:"drop-list-delete",onClick:l=>e.openDialog(a.row.supply_id)},{default:(0,t.k6)((()=>[(0,t.bF)(he,null,{default:(0,t.k6)((()=>l[77]||(l[77]=[(0,t.eW)("Delete Record")]))),_:1}),(0,t.bF)(he,{avatar:""},{default:(0,t.k6)((()=>[(0,t.bF)(re,{size:"xs",name:"eva-trash-2-outline"})])),_:1})])),_:2},1032,["onClick"])):(0,t.Q3)("",!0)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["props"])])),"header-cell-action":(0,t.k6)((l=>[(0,t.bF)(Ve,{props:l},{default:(0,t.k6)((()=>[(0,t.bF)(pe,{dense:"",label:"Download","icon-right":"eva-download-outline","no-caps":"",color:"primary",unelevated:"",class:"button-100 download-btn",disable:!e.SuppliesList||!e.SuppliesList[0],onClick:e.exportTable},null,8,["disable","onClick"])])),_:2},1032,["props"])])),_:1},8,["columns","rows"])]),(0,t.bF)(ve,{modelValue:e.isEditSupplyStock,"onUpdate:modelValue":l[46]||(l[46]=l=>e.isEditSupplyStock=l),persistent:""},{default:(0,t.k6)((()=>[(0,t.bF)(_e,{style:{"min-width":"750px"}},{default:(0,t.k6)((()=>[(0,t.Lk)("div",B,[(0,t.Lk)("div",X,[(0,t.bo)((0,t.bF)(pe,{dense:"",color:"negative",size:"0.375rem",icon:"eva-close-outline"},null,512),[[Le]])]),(0,t.Lk)("p",z,[(0,t.bF)(re,{name:"bi-capsule-pill",class:"q-mr-xs q-gutter-xs"}),l[78]||(l[78]=(0,t.eW)(" EDIT MEDICINE RECORD "))]),(0,t.bF)(fe,{onSubmit:e.editSupply},{default:(0,t.k6)((()=>[(0,t.Lk)("div",G,[(0,t.Lk)("div",H,[l[79]||(l[79]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Supply ID "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",disable:"",class:"q-mr-md q-mt-xs bg-grey-4",modelValue:e.editSupplyRecord.supply_id,"onUpdate:modelValue":l[36]||(l[36]=l=>e.editSupplyRecord.supply_id=l)},null,8,["modelValue"])]),(0,t.Lk)("div",$,[l[80]||(l[80]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Supply Name "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. Baygon Gloves",class:"q-mr-md q-mt-xs",modelValue:e.editSupplyRecord.supply_name,"onUpdate:modelValue":l[37]||(l[37]=l=>e.editSupplyRecord.supply_name=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])]),(0,t.Lk)("div",J,[l[81]||(l[81]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Supply Type "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. Glove",class:"q-mt-xs q-mr-md",modelValue:e.editSupplyRecord.supply_type,"onUpdate:modelValue":l[38]||(l[38]=l=>e.editSupplyRecord.supply_type=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])])]),(0,t.Lk)("div",Z,[(0,t.Lk)("div",ee,[l[82]||(l[82]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Manufacturing Date "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"YYYY-MM-DD",class:"q-mt-xs q-mr-md",modelValue:e.editSupplyRecord.mfg_date,"onUpdate:modelValue":l[40]||(l[40]=l=>e.editSupplyRecord.mfg_date=l),rules:[e=>e&&e.length>0||"Required field"]},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{mask:"YYYY-MM-DD",label:"YYYY-MM-DD",modelValue:e.editSupplyRecord.mfg_date,"onUpdate:modelValue":l[39]||(l[39]=l=>e.editSupplyRecord.mfg_date=l)},null,8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["modelValue","rules"])]),(0,t.Lk)("div",le,[l[83]||(l[83]=(0,t.Lk)("label",{class:"text-dark"},"Expiry Date",-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"YYYY-MM-DD",class:"q-mt-xs",modelValue:e.editSupplyRecord.exp_date,"onUpdate:modelValue":l[42]||(l[42]=l=>e.editSupplyRecord.exp_date=l)},{append:(0,t.k6)((()=>[(0,t.bF)(re,{name:"eva-calendar-outline",class:"cursor-pointer"},{default:(0,t.k6)((()=>[(0,t.bF)(ke,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.k6)((()=>[(0,t.bF)(be,{mask:"YYYY-MM-DD",label:"YYYY-MM-DD",modelValue:e.editSupplyRecord.exp_date,"onUpdate:modelValue":l[41]||(l[41]=l=>e.editSupplyRecord.exp_date=l)},null,8,["modelValue"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])]),(0,t.Lk)("div",ae,[(0,t.Lk)("div",te,[l[84]||(l[84]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Quantity Received "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. 350",class:"q-mr-md q-mt-xs",modelValue:e.editSupplyRecord.quantity,"onUpdate:modelValue":l[43]||(l[43]=l=>e.editSupplyRecord.quantity=l),rules:[e=>!isNaN(e)||"Required field"]},null,8,["modelValue","rules"])]),(0,t.Lk)("div",se,[l[85]||(l[85]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Quantity Type "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. piece",class:"q-mr-md q-mt-xs",modelValue:e.editSupplyRecord.quantity_type,"onUpdate:modelValue":l[44]||(l[44]=l=>e.editSupplyRecord.quantity_type=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])]),(0,t.Lk)("div",de,[l[86]||(l[86]=(0,t.Lk)("label",{class:"text-dark"},[(0,t.eW)("Source "),(0,t.Lk)("span",{class:"text-negative"},"*")],-1)),(0,t.bF)(ce,{dense:"",outlined:"",placeholder:"ex. DOH",class:"q-mt-xs",modelValue:e.editSupplyRecord.procured_by,"onUpdate:modelValue":l[45]||(l[45]=l=>e.editSupplyRecord.procured_by=l),rules:[e=>e&&e.length>0||"Required field"]},null,8,["modelValue","rules"])])]),(0,t.Lk)("div",oe,[(0,t.bF)(pe,{color:"primary",label:"Submit",type:"submit","no-caps":"",class:"button-120 q-mr-xl"})])])),_:1},8,["onSubmit"])])])),_:1})])),_:1},8,["modelValue"])]),(0,t.bF)(De,{content:e.$options.components.DeleteSupplyConfirmation},null,8,["content"])])}a(939),a(4520),a(7049);var ue=a(4187),ie=a(3022),pe=a(8564),re=a(891),ce=a(3328),me=a(9077),ye=a(8822),be=a(3271),ke=a(6091),_e=a(662),ve=a(2222),fe=a(1497);const ge={components:{MHCDialog:_e.A,DeleteSupplyConfirmation:be.A},setup(){const e=(0,ie.A)();let l=ce.A.getItem("cred");null===l&&router.push({name:"login"});const a=(0,ue.KR)([{name:"supply_id",align:"left",label:"ID",field:"supply_id",sortable:!0},{name:"supply_name",align:"left",label:"Supply Name",field:"supply_name",sortable:!0},{name:"supply_type",align:"left",label:"Supply Type",field:"supply_type",sortable:!0},{name:"mfg_date",align:"left",label:"Mfg Date",field:"mfg_date",sortable:!0,classes:"hidden",headerClasses:"hidden"},{name:"exp_date",align:"left",label:"Exp Date",field:"exp_date",sortable:!0},{name:"quantity",align:"left",label:"Received",field:"quantity",sortable:!0},{name:"in_stock",align:"left",label:"In Stock",field:e=>e.quantity-e.quantity_released,sortable:!0},{name:"quantity_type",align:"left",label:"Qty Type",field:"quantity_type",sortable:!0},{name:"procured_by",align:"left",label:"Procured By",field:"procured_by",sortable:!0,classes:"hidden",headerClasses:"hidden"},{name:"date_added",align:"left",label:"Date Added",field:"date_added",sortable:!0,classes:"hidden",headerClasses:"hidden"},{name:"added_by",align:"left",label:"Added By",field:"added_by",sortable:!0,classes:"hidden",headerClasses:"hidden"},{name:"status",align:"left",label:"Status",field:e=>c[e.status],sortable:!0,classes:"hidden",headerClasses:"hidden"},{name:"action",align:"left",label:"",field:"action"}]);let t=re.Ay.formatDate(Date.now(),"YYYY-MM-DD");const s=e=>{const l=864e5,a=Math.round((new Date(e.exp_date)-new Date(t))/l);return a<=100?"text-red":""};let d=(0,ue.KR)(!1),o=(0,ue.KR)(!1);const n=()=>{m.value=[0],y.value=[],b.value=[],k.value=[],r.value=[0,1e3]};let u=(0,ue.KR)("Supply ID"),i=(0,ue.KR)(["Supply ID","Supply Name","Supply Type","Quantity Type","Procured By"]),p=(0,ue.KR)(null),r=(0,ue.KR)([0,1e3]),c=["Active","Deleted"],m=(0,ue.KR)([0]),y=(0,ue.KR)([]),b=(0,ue.KR)([]),k=(0,ue.KR)([]);const _=()=>{let e={search_by:{search_category:u.value,search_string:p.value},filter:{in_stock:r.value,status:m.value,mfg_date:y.value,exp_date:b.value,date_added:k.value}};pe.A.show(),(0,me.uo)(e).then((e=>{pe.A.hide()}))};_();let v=(0,ue.KR)({supply_name:null,supply_type:null,mfg_date:null,exp_date:null,quantity:null,quantity_type:null,procured_by:null,date_added:re.Ay.formatDate(new Date,"YYYY-MM-DD"),added_by:l&&l.user_id,status:0});const f=()=>{pe.A.show(),(0,me.ne)(v.value).then((l=>{pe.A.hide();let a="success"===l.status?0:1;e.notify({type:0===a?"positive":"negative",classes:"text-white",message:0===a?"Supply record added successfully":"Failed to add supply record"}),a||(o.value=!1,g())}))},g=()=>{v.value={supply_name:null,supply_type:null,mfg_date:null,exp_date:null,quantity:null,quantity_type:null,procured_by:null,date_added:re.Ay.formatDate(new Date,"YYYY-MM-DD"),added_by:l&&l.user_id,status:0}};let x=(0,ue.KR)(!1),h=(0,ue.KR)({});const S=e=>{x.value=!0,h.value={supply_id:e.supply_id,supply_name:e.supply_name,supply_type:e.supply_type,mfg_date:e.mfg_date,exp_date:e.exp_date,quantity:e.quantity,quantity_type:e.quantity_type,procured_by:e.procured_by,date_added:e.date_added,added_by:e.added_by,status:e.status}},q=()=>{pe.A.show(),(0,me.qf)(h.value).then((l=>{pe.A.hide(),x.value=!1;let a="success"===l.status?0:1;e.notify({type:0===a?"positive":"negative",classes:"text-white",message:0===a?"Supply record edited successfully":"Failed to edit supply record"})}))},F=e=>{(0,ve.b)(e),(0,ke.o)()},V=(e,l,a)=>{let t=void 0!==l?l(e,a):e;return t=void 0===t||null===t?"":String(t),t=t.split('"').join('""'),`"${t}"`},w=()=>{const l=[a.value.map((e=>V(e.label)))].concat(me.qj.value.map((e=>a.value.map((l=>V("function"===typeof l.field?l.field(e):e[void 0===l.field?l.name:l.field],l.format,e))).join(",")))).join("\r\n"),t=(0,fe.A)("Supply Records.csv",l,"text/csv");!0!==t&&e.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})};let D=(0,ue.KR)(!1),L=(0,ue.KR)({user_id:null,department:null,supplies_array:[{supply_id:null,quantity:null}],released_by:l&&l.user_id}),R=(0,ue.KR)([]);const A=(e,l,a)=>{e.length>5||!isNaN(e)?l((()=>{if(isNaN(e)){const l=String(e.toLowerCase());(0,ye.i4)(l).then((e=>{if(R.value=[],"success"===e.status){let l=(0,ue.KR)([]);l.value=e.data,l.value.forEach((e=>{let l={user_name:e.id+" - "+e.user_name,department:e.department,user_id:e.id};R.value.push(l)}))}}))}else(0,ye.Wh)(e).then((e=>{if(R.value=[],"success"===e.status){let l=(0,ue.KR)([]);l.value=e.data,l.value.forEach((e=>{let l={user_name:e.id+" - "+e.user_name,department:e.department,user_id:e.id};R.value.push(l)}))}}))})):a()};let Y=["Outpatient Department","Dental","Prenatal and Immunization","Pharmacy","Front Desk","Admin Office"];const C=()=>{null!==L.value.user_id?(0,ye.ol)(L.value.user_id).then((e=>{L.value.department=Y[e.data[0].department-1]})):L.value.department=null};let U=(0,ue.KR)([]);const M=(e,l,a)=>{e.length>3?l((()=>{const l=String(e.toLowerCase());(0,me.DD)(l).then((e=>{if(U.value=[],"success"===e.status){let l=(0,ue.KR)([]);l.value=e.data,l.value.forEach((e=>{let l={supply_name:e.supply_type+" - "+e.supply_name+" ("+(e.quantity-e.quantity_released)+")",supply_id:e.supply_id};U.value.push(l)}))}}))})):a()},Q=()=>{L.value.supplies_array.push({supply_id:null,quantity:null})},E=e=>{L.value.supplies_array.splice(e,1)},W=()=>{L.value.department=Y.indexOf(L.value.department)+1,pe.A.show(),(0,me._W)(L.value).then((l=>{pe.A.hide();let a="success"===l.status?0:1;e.notify({type:0===a?"positive":"negative",classes:"text-white",message:0===a?"Supply releases added successfully":"Failed to add supply releases"}),D.value=!1}))};return{selectedSearchBy:u,searchBy:i,searchString:p,columns:a,showFilterModal:d,isAddNewSupplyStock:o,statusList:c,status_array_model:m,mfgDate:y,expDate:b,dateAdded:k,inStock:r,getRecords:_,SuppliesList:me.qj,newSupplyRecord:v,addSupplyRecord:f,onReset:g,openDialog:F,isEditSupplyStock:x,editRecordModal:S,editSupplyRecord:h,editSupply:q,exportTable:w,keySession:l,getExpDateClass:s,isSupplyRelease:D,supplyReleaseDetails:L,filtersDepartment:Y,findDepartment:C,userFilterFunction:A,addSupply:Q,removeSupply:E,supplyList:U,supplyFilterFunction:M,userOptions:R,userFilterFunction:A,addSupplyRelease:W,resetFilter:n}}};var xe=a(2968),he=a(1244),Se=a(6067),qe=a(3933),Fe=a(9549),Ve=a(45),we=a(3341),De=a(7328),Le=a(8360),Re=a(5626),Ae=a(3417),Ye=a(6915),Ce=a(1263),Ue=a(8785),Me=a(5389),Qe=a(3766),Ee=a(2589),We=a(4958),Ne=a(2517),Te=a(8657),Ie=a(272),Ke=a.n(Ie);const je=(0,xe.A)(ge,[["render",ne],["__scopeId","data-v-0a099ebe"]]),Pe=je;Ke()(ge,"components",{QBtn:he.A,QInput:Se.A,QIcon:qe.A,QSelect:Fe.A,QDialog:Ve.A,QCard:we.A,QCheckbox:De.A,QPopupProxy:Le.A,QDate:Re.A,QForm:Ae.A,QSeparator:Ye.A,QTable:Ce.A,QTd:Ue.A,QMenu:Me.A,QList:Qe.A,QItem:Ee.A,QItemSection:We.A,QTh:Ne.A}),Ke()(ge,"directives",{ClosePopup:Te.A})}}]);