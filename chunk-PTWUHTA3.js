import{a as ue}from"./chunk-MBJXFQQZ.js";import{c as N,d as B}from"./chunk-2QODGAY2.js";import{a as me}from"./chunk-HUTYSJ3T.js";import{b as I,f as T,i as E,p as L,q as te,s as ne,v as ie}from"./chunk-Q45AA772.js";import{a as pe,b as ge}from"./chunk-6OM4G5IL.js";import{a as j,b as Q}from"./chunk-EA4NVXWS.js";import{a as A,b as V,c as U,d as se,e as z,f as de,g as le,h as ce,i as R}from"./chunk-6MQC3ILS.js";import{$a as Y,Ba as l,Ca as t,Da as n,Ea as y,Hb as O,Hc as ae,Ib as S,J as f,Jc as oe,K as h,Kc as re,La as v,Lb as X,Lc as F,Mb as Z,Na as u,Nb as D,Pa as m,U as p,Xb as ee,ba as q,bb as o,ca as r,cb as _,db as b,fb as M,gb as w,hb as P,ia as $,ma as C,mb as H,nb as K,ob as k,qa as g,qb as J,rb as G}from"./chunk-4ILKLGUS.js";function we(i,a){if(i&1&&(t(0,"div",11)(1,"div",12)(2,"span"),o(3),n(),t(4,"small",13),o(5),k(6,"date"),n()()()),i&2){let e=a.$implicit;Y("user-message",e.isUser)("bot-message",!e.isUser),r(3),_(e.text),r(2),_(J(6,6,e.timestamp,"shortTime"))}}function Pe(i,a){i&1&&(t(0,"div",14)(1,"div",15)(2,"span"),o(3,"."),n(),t(4,"span"),o(5,"."),n(),t(6,"span"),o(7,"."),n()()())}function ke(i,a){if(i&1){let e=v();t(0,"div",3)(1,"mat-card")(2,"mat-card-header")(3,"mat-icon",4),o(4,"flight_takeoff"),n(),t(5,"mat-card-title"),o(6,"Travel Assistant"),n(),t(7,"mat-card-subtitle"),o(8,"I only answer travel & destination questions! \u2708\uFE0F"),n()(),t(9,"mat-card-content",5),g(10,we,7,9,"div",6)(11,Pe,8,0,"div",7),n(),t(12,"mat-card-actions")(13,"div",8)(14,"input",9),P("ngModelChange",function(d){f(e);let c=m();return w(c.userInput,d)||(c.userInput=d),h(d)}),u("keyup.enter",function(){f(e);let d=m();return h(d.sendMessage())}),n(),t(15,"button",10),u("click",function(){f(e);let d=m();return h(d.sendMessage())}),t(16,"mat-icon"),o(17,"send"),n()()()()()()}if(i&2){let e=m();r(10),l("ngForOf",e.messages()),r(),l("ngIf",e.isLoading()),r(3),M("ngModel",e.userInput),l("disabled",e.isLoading()),r(),l("disabled",e.isLoading()||!e.userInput.trim())}}var W=class i{isOpen=p(!1);isLoading=p(!1);userInput="";messages=p([{text:`Hi! I'm your travel assistant \u2708\uFE0F

I can help you with:
\u2022 Destination recommendations only related to
\u2022 Budget planning
\u2022 Packing tips
\u2022 Weather & best time to visit
\u2022 Food & attractions

Currently supported destinations:
\u{1F1EB}\u{1F1F7} Paris
\u{1F334} Bali
\u{1F5FC} Tokyo
\u{1F5FD} New York

How can I help you today?`,isUser:!1,timestamp:new Date}]);travelKeywords=["destination","travel","trip","vacation","holiday","tour","hotel","flight","booking","budget","price","cost","packing","weather","food","visa","passport","attraction","activity","beach","mountain","city","country","tourism","tourist","journey","adventure","plan","recommend","suggest","visit"];destinationResponses={paris:`Paris \u{1F1EB}\u{1F1F7} is beautiful! Best time: April-June or Sept-Oct.

Top attractions:
\u2022 Eiffel Tower
\u2022 Louvre Museum
\u2022 Seine River Cruise

Average hotel: $150-250/night.`,bali:`Bali \u{1F334} is amazing! Best time: April-Oct (dry season).

Don't miss:
\u2022 Ubud Rice Terraces
\u2022 Uluwatu Temple
\u2022 Bali Beaches

Budget: $30-100/day.`,tokyo:`Tokyo \u{1F5FC} is incredible! Best time: March-April or Oct-Nov.

Top spots:
\u2022 Shibuya Crossing
\u2022 Senso-ji Temple
\u2022 Tokyo Tower

Food is amazing and affordable!`,nyc:`New York \u{1F5FD} never sleeps!

Best time: April-June or Sept-Nov.

Must visit:
\u2022 Times Square
\u2022 Central Park
\u2022 Statue of Liberty`};unsupportedDestinations=["japan","london","dubai","singapore","maldives","thailand","rome","spain","switzerland","germany","canada","australia","korea","china","india"];responses={packing:`Essential packing items \u2708\uFE0F:
\u2022 Passport & documents
\u2022 Comfortable shoes
\u2022 Power bank
\u2022 Universal adapter
\u2022 Weather-appropriate clothes
\u2022 Medicines`,budget:`Budget travel tips \u{1F4B0}:
\u2022 Book flights early
\u2022 Travel off-season
\u2022 Use public transport
\u2022 Stay in hostels/guesthouses
\u2022 Eat local food`,weather:`Always check weather forecasts before traveling \u{1F326}\uFE0F

Pack layers and keep an umbrella or sunscreen depending on the destination.`,safety:`Safety tips \u{1F6E1}\uFE0F:
\u2022 Keep copies of documents
\u2022 Avoid isolated places at night
\u2022 Use hotel safes
\u2022 Learn emergency contacts`,food:`Food travel tips \u{1F35C}:
\u2022 Try local cuisine
\u2022 Visit local markets
\u2022 Read food reviews
\u2022 Drink safe water`,"best time":"Generally, Spring \u{1F338} and Autumn \u{1F342} are the best travel seasons worldwide due to pleasant weather and fewer crowds."};toggleChat(){this.isOpen.update(a=>!a)}sendMessage(){if(!this.userInput.trim()||this.isLoading())return;let a=this.userInput.trim();this.userInput="",this.messages.update(e=>[...e,{text:a,isUser:!0,timestamp:new Date}]),this.isLoading.set(!0),setTimeout(()=>{let e=this.getResponse(a);this.messages.update(s=>[...s,{text:e,isUser:!1,timestamp:new Date}]),this.isLoading.set(!1)},800)}getResponse(a){let e=a.toLowerCase();if(!this.travelKeywords.some(x=>e.includes(x)))return`I'm a travel assistant \u2708\uFE0F

I can only help with travel-related questions like destinations, trips, hotels, budget planning, packing, and tourism.

Please ask something travel-related \u{1F30D}`;let d=Object.keys(this.destinationResponses).find(x=>e.includes(x));if(d)return this.destinationResponses[d];let c=this.unsupportedDestinations.find(x=>e.includes(x));return c?`Sorry \u{1F605} Currently we don't have travel plans or guides for ${c.charAt(0).toUpperCase()+c.slice(1)} yet.

Right now I can help you with:
\u{1F1EB}\u{1F1F7} Paris
\u{1F334} Bali
\u{1F5FC} Tokyo
\u{1F5FD} New York

More destinations will be added soon \u2708\uFE0F`:e.includes("pack")||e.includes("luggage")?this.responses.packing:e.includes("budget")||e.includes("cheap")||e.includes("cost")?this.responses.budget:e.includes("weather")||e.includes("climate")?this.responses.weather:e.includes("safe")||e.includes("safety")?this.responses.safety:e.includes("food")||e.includes("eat")||e.includes("restaurant")?this.responses.food:e.includes("best time")||e.includes("season")?this.responses["best time"]:`I understand you're asking about travel \u{1F30D}

Currently I can best help with:
\u2022 Paris \u{1F1EB}\u{1F1F7}
\u2022 Bali \u{1F334}
\u2022 Tokyo \u{1F5FC}
\u2022 New York \u{1F5FD}

You can also ask me about:
\u2022 Budget travel
\u2022 Packing tips
\u2022 Weather
\u2022 Food & attractions
\u2022 Travel safety`}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=C({type:i,selectors:[["app-travel-chatbot"]],decls:5,vars:4,consts:[[1,"chatbot-container"],["mat-fab","","color","primary",1,"chat-toggle-btn",3,"click"],["class","chat-window",4,"ngIf"],[1,"chat-window"],["mat-card-avatar",""],[1,"chat-messages"],["class","message",3,"user-message","bot-message",4,"ngFor","ngForOf"],["class","message bot-message",4,"ngIf"],[1,"chat-input"],["matInput","","placeholder","Ask about destinations, travel tips, prices...",3,"ngModelChange","keyup.enter","ngModel","disabled"],["mat-icon-button","","color","primary",3,"click","disabled"],[1,"message"],[1,"message-bubble"],[1,"time"],[1,"message","bot-message"],[1,"message-bubble","typing-indicator"]],template:function(e,s){e&1&&(t(0,"div",0)(1,"button",1),u("click",function(){return s.toggleChat()}),t(2,"mat-icon"),o(3),n()(),g(4,ke,18,5,"div",2),n()),e&2&&(Y("open",s.isOpen()),r(3),_(s.isOpen()?"close":"chat"),r(),l("ngIf",s.isOpen()))},dependencies:[D,O,S,L,I,T,E,F,ae,re,Q,j,B,N,R,A,z,ce,U,de,se,V,X],styles:[".chatbot-container[_ngcontent-%COMP%]{position:fixed;bottom:20px;right:20px;z-index:1000}.chat-toggle-btn[_ngcontent-%COMP%]{position:relative;z-index:1001;box-shadow:0 4px 12px #00000026}.chat-window[_ngcontent-%COMP%]{position:absolute;bottom:80px;right:0;width:350px;height:500px;z-index:1000;animation:_ngcontent-%COMP%_slideUp .3s ease}@keyframes _ngcontent-%COMP%_slideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}.chat-window[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;padding:0;border-radius:12px;box-shadow:0 8px 24px #00000026}mat-card-header[_ngcontent-%COMP%]{padding:16px;background:#1976d2;color:#fff;border-radius:12px 12px 0 0}mat-card-header[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], mat-card-header[_ngcontent-%COMP%]   .mat-card-title[_ngcontent-%COMP%], mat-card-header[_ngcontent-%COMP%]   .mat-card-subtitle[_ngcontent-%COMP%]{color:#fff}.chat-messages[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:16px;min-height:300px;max-height:350px;background:#f5f5f5}.message[_ngcontent-%COMP%]{margin-bottom:12px;display:flex}.user-message[_ngcontent-%COMP%]{justify-content:flex-end}.bot-message[_ngcontent-%COMP%]{justify-content:flex-start}.message-bubble[_ngcontent-%COMP%]{max-width:80%;padding:10px 14px;border-radius:18px;position:relative;word-wrap:break-word}.user-message[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background:#1976d2;color:#fff;border-bottom-right-radius:4px}.bot-message[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%]{background:#fff;color:#333;border-bottom-left-radius:4px;box-shadow:0 1px 2px #0000001a}.time[_ngcontent-%COMP%]{font-size:10px;margin-left:8px;opacity:.7}.typing-indicator[_ngcontent-%COMP%]{display:flex;gap:4px;padding:8px 12px}.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_blink 1.4s infinite;animation-fill-mode:both;display:inline-block;font-size:20px;line-height:1}.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2){animation-delay:.2s}.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(3){animation-delay:.4s}@keyframes _ngcontent-%COMP%_blink{0%,60%,to{opacity:0}20%{opacity:1}}mat-card-actions[_ngcontent-%COMP%]{padding:12px;border-top:1px solid #e0e0e0;background:#fff;border-radius:0 0 12px 12px}.chat-input[_ngcontent-%COMP%]{display:flex;width:100%;gap:8px;align-items:center}.chat-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{flex:1;border:1px solid #ddd;border-radius:20px;padding:8px 16px;outline:none;font-size:14px}.chat-input[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{border-color:#1976d2}@media(max-width:768px){.chat-window[_ngcontent-%COMP%]{width:300px;height:450px;bottom:70px;right:0}.chatbot-container[_ngcontent-%COMP%]{bottom:10px;right:10px}}"]})};var Oe=()=>[1,2,3,4,5],Se=i=>["/booking",i];function De(i,a){if(i&1){let e=v();t(0,"mat-icon",8),u("click",function(){f(e);let d=m();return h(d.clearSearch())}),o(1,"close"),n()}}function Ie(i,a){i&1&&(t(0,"div",9),y(1,"mat-spinner",10),n())}function Te(i,a){if(i&1&&(t(0,"mat-icon"),o(1),n()),i&2){let e=a.$implicit,s=m().$implicit;r(),b("star",e<=s.rating?"":"_border")}}function Ee(i,a){if(i&1&&(t(0,"mat-card"),y(1,"img",14),t(2,"mat-card-content",15)(3,"mat-card-title"),o(4),n(),t(5,"div",16),g(6,Te,2,1,"mat-icon",12),t(7,"span",17),o(8),n()(),t(9,"p",18),o(10),k(11,"slice"),n(),t(12,"div",19)(13,"div")(14,"span",20),o(15),n(),t(16,"span",21),o(17),n()(),t(18,"span",21),o(19),n()()(),t(20,"mat-card-actions")(21,"button",22),o(22," Book Now "),n()()()),i&2){let e=a.$implicit;r(),l("src",e.image,q)("alt",e.name),r(3),_(e.name),r(2),l("ngForOf",H(14,Oe)),r(2),b("(",e.rating,")"),r(2),b("",G(11,10,e.description,0,100),"..."),r(5),b("$",e.price),r(2),b(" / ",e.duration),r(2),_(e.duration),r(2),l("routerLink",K(15,Se,e._id))}}function Le(i,a){if(i&1){let e=v();t(0,"div",23)(1,"mat-icon",24),o(2,"search"),n(),t(3,"h3"),o(4,"No destinations found"),n(),t(5,"p"),o(6,"Try searching with different keywords"),n(),t(7,"button",25),u("click",function(){f(e);let d=m(2);return h(d.clearSearch())}),o(8,"Clear Search"),n()()}}function Ne(i,a){if(i&1&&(t(0,"div",11),g(1,Ee,23,17,"mat-card",12)(2,Le,9,0,"div",13),n()),i&2){let e=m();r(),l("ngForOf",e.filteredDestinations()),r(),l("ngIf",e.filteredDestinations().length===0)}}var fe=class i{constructor(a){this.destinationService=a}destinations=p([]);filteredDestinations=p([]);searchQuery=p("");loading=p(!0);ngOnInit(){this.loadDestinations()}loadDestinations(){this.loading.set(!0),this.destinationService.getAllDestinations().subscribe({next:a=>{this.destinations.set(a),this.filteredDestinations.set(a),this.loading.set(!1)},error:()=>this.loading.set(!1)})}onSearch(){let a=this.searchQuery().trim();if(!a){this.filteredDestinations.set(this.destinations());return}this.destinationService.searchDestinations(a).subscribe({next:e=>this.filteredDestinations.set(e)})}clearSearch(){this.searchQuery.set(""),this.filteredDestinations.set(this.destinations())}static \u0275fac=function(e){return new(e||i)($(ue))};static \u0275cmp=C({type:i,selectors:[["app-destination-list"]],decls:12,vars:4,consts:[[1,"container-custom",2,"padding","2rem"],[2,"text-align","center","margin-bottom","2rem","color","#1976d2"],[1,"search-box"],["appearance","outline",2,"width","100%"],["matInput","","placeholder","e.g., Paris, Tokyo",3,"ngModelChange","ngModel"],["matSuffix","","style","cursor: pointer",3,"click",4,"ngIf"],["style","text-align: center; padding: 3rem",4,"ngIf"],["class","destination-grid",4,"ngIf"],["matSuffix","",2,"cursor","pointer",3,"click"],[2,"text-align","center","padding","3rem"],["diameter","50",2,"margin","0 auto"],[1,"destination-grid"],[4,"ngFor","ngForOf"],["style","text-align: center; grid-column: 1/-1; padding: 3rem",4,"ngIf"],["mat-card-image","",3,"src","alt"],[1,"mt-2"],[1,"rating"],[2,"margin-left","8px"],[2,"margin","12px 0"],[2,"display","flex","justify-content","space-between","align-items","baseline","margin-top","12px"],[1,"price"],[1,"duration"],["mat-raised-button","","color","primary",2,"width","100%",3,"routerLink"],[2,"text-align","center","grid-column","1/-1","padding","3rem"],[2,"font-size","4rem","width","auto","height","auto","color","#999"],["mat-button","","color","primary",3,"click"]],template:function(e,s){e&1&&(t(0,"div",0)(1,"h1",1),o(2,"Explore Destinations"),n(),t(3,"div",2)(4,"mat-form-field",3)(5,"mat-label"),o(6,"Search destinations"),n(),t(7,"input",4),P("ngModelChange",function(c){return w(s.searchQuery,c)||(s.searchQuery=c),c}),u("ngModelChange",function(){return s.onSearch()}),n(),g(8,De,2,0,"mat-icon",5),n()(),g(9,Ie,2,0,"div",6)(10,Ne,3,2,"div",7),n(),y(11,"app-travel-chatbot")),e&2&&(r(7),M("ngModel",s.searchQuery),r(),l("ngIf",s.searchQuery),r(),l("ngIf",s.loading()),r(),l("ngIf",!s.loading()))},dependencies:[D,O,S,W,ee,L,I,T,E,R,A,z,U,le,V,F,oe,B,N,ie,te,ne,Q,j,me,ge,pe,Z],styles:[".search-box[_ngcontent-%COMP%]{width:100%;max-width:500px;margin:0 auto 2rem}.destination-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:1.5rem;padding:1rem}mat-card[_ngcontent-%COMP%]{height:100%;display:flex;flex-direction:column;transition:transform .2s}mat-card[_ngcontent-%COMP%]:hover{transform:translateY(-5px)}mat-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:200px;object-fit:cover}.rating[_ngcontent-%COMP%]{color:#ffc107;margin-top:8px}.price[_ngcontent-%COMP%]{font-size:1.5rem;font-weight:700;color:#1976d2}.duration[_ngcontent-%COMP%]{color:#666;font-size:.9rem}@media(max-width:420px){.destination-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1rem;padding:.5rem}}"]})};export{fe as DestinationListComponent};
