const donors=[
  {id:"harbor-bakery",name:"Harbor Bakery",food:"Fresh bread & pastries",meals:72,window:"Pickup by 18:15",icon:"🥖",diet:"vegetarian"},
  {id:"green-table",name:"Green Table Kitchen",food:"Vegetable rice bowls",meals:64,window:"Pickup by 18:40",icon:"🍲",diet:"halal"},
  {id:"market-garden",name:"Market Garden",food:"Seasonal produce boxes",meals:48,window:"Pickup by 19:10",icon:"🥬",diet:"vegan"}
];
const needs=[
  {id:"night-shelter",name:"Night Shelter",detail:"80 dinner places · 18:30 service",urgency:"high",tag:"Urgent",diet:"halal",capacity:80},
  {id:"family-hub",name:"Family Hub",detail:"55 households · pickup until 19:15",urgency:"medium",tag:"Family meals",diet:"vegetarian",capacity:55},
  {id:"youth-centre",name:"Youth Centre",detail:"38 young people · 19:30 service",urgency:"low",tag:"Plant-based",diet:"vegan",capacity:38}
];
let stagedPlan=null,approved=false;
const toolSpecs=[
  {name:"inspect_rescue_context",mode:"READ ONLY",description:"Return current surplus offers, partner needs, dietary fit, and time windows."},
  {name:"propose_rescue_plan",mode:"READ ONLY",description:"Create an explainable allocation proposal optimized for urgency and dietary compatibility."},
  {name:"stage_allocation",mode:"STAGES ONLY",description:"Put a reviewed plan into a visible pending state. It never sends a dispatch."},
  {name:"approve_allocation",mode:"HUMAN CONFIRM",description:"Commit a staged plan only when confirmation equals HUMAN_APPROVED."},
  {name:"generate_pickup_manifest",mode:"READ ONLY",description:"Create a driver-ready list from the currently staged or approved allocation."}
];
const byId=id=>document.getElementById(id);
function renderLists(){
  byId("donorList").innerHTML=donors.map(d=>`<div class="offer"><div class="food-icon">${d.icon}</div><div><strong>${d.name}</strong><p>${d.food}</p></div><div class="offer-meta">${d.meals} meals<span>${d.window}</span></div></div>`).join("");
  byId("needList").innerHTML=needs.map(n=>`<div class="need"><i class="urgency ${n.urgency}"></i><div><strong>${n.name}</strong><p>${n.detail}</p></div><span class="tag">${n.tag}</span></div>`).join("");
}
function makePlan(){
  const allocations=[
    {from:"Green Table Kitchen",to:"Night Shelter",meals:64,why:"halal bowls · urgent service"},
    {from:"Harbor Bakery",to:"Family Hub",meals:55,why:"family pickup window"},
    {from:"Market Garden",to:"Youth Centre",meals:38,why:"plant-based fit"}
  ];
  return {id:`plan-${Date.now()}`,allocations,total:157,confidence:"94%",reason:"Prioritizes the 18:30 shelter service first, preserves dietary fit, and leaves 27 flexible meals for late-response partners."};
}
function showPlan(plan,wasApproved=false){
  stagedPlan=plan;approved=wasApproved;byId("emptyPlan").hidden=true;byId("planCard").hidden=false;
  const node=byId("planTemplate").content.cloneNode(true);node.querySelector("#planMealCount").textContent=plan.total;node.querySelector("#planReason").textContent=plan.reason;node.querySelector("#planScore").textContent=plan.confidence;
  node.querySelector("#allocationList").innerHTML=plan.allocations.map(a=>`<div class="allocation"><div><b>${a.from}</b><span>${a.meals} meals</span></div><div class="arrow">→</div><div><b>${a.to}</b><span>${a.why}</span></div></div>`).join("");
  const button=node.querySelector("#approveButton"); if(wasApproved){button.textContent="Approval recorded locally ✓";button.disabled=true;button.style.background="#0e3728";node.querySelector(".plan-kicker").textContent="APPROVED · DEMO ONLY";node.querySelector(".plan-card").style.background="#f3fcf5";}
  else button.addEventListener("click",()=>approvePlan("HUMAN_APPROVED"));byId("planCard").replaceChildren(node);updateStatus(wasApproved?"approved":"draft");byId("planSection").scrollIntoView({behavior:"smooth",block:"center"});
}
function updateStatus(type){const el=byId("planStatus");el.className=`status ${type}`;el.textContent=type==="approved"?"Approval recorded locally":type==="draft"?"Draft · review required":"Waiting for a plan";}
function stagePlan(){showPlan(makePlan());return {ok:true,message:"Demo allocation staged for visible human review. No partner has been contacted.",plan:stagedPlan};}
function approvePlan(confirmation){if(!stagedPlan)return {ok:false,error:"No plan is staged."};if(confirmation!=="HUMAN_APPROVED")return {ok:false,error:"Allocation is not approved. Ask the user for explicit human confirmation."};showPlan(stagedPlan,true);return {ok:true,message:"Demo approval recorded locally. No dispatch or notification was sent.",plan:stagedPlan};}
function rescueContext(){return {environment:"demo",offers:donors,needs,policy:"Demo data only. Allocations require a visible staged plan and HUMAN_APPROVED confirmation; no external action is sent."};}
function proposePlan(){const plan=makePlan();return {plan,total_meals:plan.total,unallocated_meals:27,rationale:plan.reason};}
function manifest(){if(!stagedPlan)return {ok:false,error:"No staged allocation exists."};return {ok:true,pickups:stagedPlan.allocations.map((a,i)=>({stop:i+1,from:a.from,to:a.to,meals:a.meals})),approval:approved?"approved":"pending human approval"};}
async function registerWebMCP(){
  const api=document.modelContext;if(!api?.registerTool){byId("apiState").textContent="WebMCP API not detected — interactive fallback remains active.";return;}
  const register=(name,description,inputSchema,execute,annotations={})=>api.registerTool({name,description,inputSchema,execute,annotations});
  try {
    await Promise.all([
      register("inspect_rescue_context","Return demo surplus, partner needs, time windows, and the local-only approval policy.",{type:"object",properties:{}},async()=>JSON.stringify(rescueContext()),{readOnlyHint:true,untrustedContentHint:true}),
      register("propose_rescue_plan","Propose a transparent demo rescue plan. This does not change an allocation.",{type:"object",properties:{priority:{type:"string",enum:["urgency","dietary_fit","distance"],description:"Planning preference. Defaults to urgency."}}},async()=>JSON.stringify(proposePlan()),{readOnlyHint:true,untrustedContentHint:true}),
      register("stage_allocation","Stage a demo allocation for visible human review. This does not dispatch food or notify partners.",{type:"object",properties:{}},async()=>JSON.stringify(stagePlan()),{untrustedContentHint:true}),
      register("approve_allocation","Record local demo approval only after visible human review. Pass HUMAN_APPROVED exactly.",{type:"object",properties:{confirmation:{type:"string",description:"Exact string HUMAN_APPROVED after human review."}},required:["confirmation"]},async input=>JSON.stringify(approvePlan(input.confirmation)),{untrustedContentHint:true}),
      register("generate_pickup_manifest","Produce a driver-ready manifest from the demo plan without changing it.",{type:"object",properties:{}},async()=>JSON.stringify(manifest()),{readOnlyHint:true,untrustedContentHint:true})
    ]);
    byId("apiState").textContent="WebMCP API detected — 5 tools registered.";
  } catch { byId("apiState").textContent="WebMCP registration was unavailable — interactive fallback remains active."; }
}
function init(){renderLists();byId("planButton").addEventListener("click",stagePlan);byId("emptyPlanButton").addEventListener("click",stagePlan);byId("priorityButton").addEventListener("click",()=>{needs.sort((a,b)=>["high","medium","low"].indexOf(a.urgency)-["high","medium","low"].indexOf(b.urgency));renderLists();});byId("toolList").innerHTML=toolSpecs.map(t=>`<div class="tool"><span class="mode">${t.mode}</span><b>${t.name}</b><p>${t.description}</p></div>`).join("");const dialog=byId("toolsDialog");byId("openTools").addEventListener("click",()=>dialog.showModal());[byId("closeTools"),byId("closeToolsBottom")].forEach(b=>b.addEventListener("click",()=>dialog.close()));registerWebMCP();}
init();
