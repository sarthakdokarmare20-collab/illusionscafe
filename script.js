/* =================================================
   PAGE SWITCHING (SPA NAVIGATION)
================================================= */
function openPage(pageId){

  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });

  const frHome   = document.getElementById("franchise-home");
  const frDetail = document.getElementById("franchise-detail");

  if(frHome) frHome.style.display = "none";
  if(frDetail) frDetail.style.display = "none";

  const page = document.getElementById(pageId);
  if(page) page.classList.add("active");

  if(pageId === "franchise" && frHome){
    frHome.style.display = "block";
    runFranchiseSequence();
  }

  if(pageId === "menu"){
    resetMenuView();
  }
 if(pageId === "about"){
  setTimeout(runMainAboutAnimation, 300);
}


}

/* =================================================
   MENU
================================================= */
function resetMenuView(){
  const detail = document.getElementById("menuDetail");
  const cats   = document.getElementById("menuCategories");
  if(detail && cats){
    detail.style.display = "none";
    cats.style.display = "grid";
  }
}

function openMenu(key){
  if(!window.menuData || !menuData[key]) return;

  document.getElementById("menuCategories").style.display="none";
  document.getElementById("menuDetail").style.display="block";
  document.getElementById("menuTitle").innerText = menuData[key].title;
document.querySelector(".menu-hero").style.display = "none";

  const box = document.getElementById("menuItems");
  box.innerHTML = "";

  menuData[key].items.forEach(i=>{
    box.innerHTML += `
      <div class="menu-item">
        <div>
          <strong>${i[0]}</strong>
          ${i[2] ? `<p class="menu-desc-text">${i[2]}</p>` : ""}
        </div>
        <b>₹${i[1]}</b>
      </div>
    `;
  });

  if(menuData[key].note){
    box.innerHTML += `<p class="menu-note">${menuData[key].note}</p>`;
  }
}

function backToCategories(){
  resetMenuView();
  document.querySelector(".menu-hero").style.display = "block";
}


/* =================================================
   ORDER NOW
================================================= */
function orderNow(){
  window.open("https://zomato.onelink.me/xqzv/uik4ac3j","_blank");
}

/* =================================================
   RESERVATION → WHATSAPP
================================================= */
const reservationForm = document.getElementById("reservationForm");
if(reservationForm){
  reservationForm.addEventListener("submit",e=>{
    e.preventDefault();

    const msg =
`New Table Reservation 🍽️
Name: ${resName.value}
Mobile: ${resPhone.value}
Date: ${resDate.value}
Time: ${resTime.value}
Note: ${resNote.value}`;

    window.open(
      `https://wa.me/919270555031?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  });
}

/* =================================================
   GALLERY LIGHTBOX
================================================= */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

document.querySelectorAll(".gallery-img").forEach(img=>{
  img.onclick=()=>{
    lightbox.style.display="flex";
    lightboxImg.src=img.src;
    document.body.style.overflow="hidden";
  }
});

function closeLightbox(){
  lightbox.style.display="none";
  lightboxImg.src="";
  document.body.style.overflow="auto";
}

document.querySelector(".lightbox-close")?.addEventListener("click",closeLightbox);
lightbox?.addEventListener("click",e=>{
  if(e.target===lightbox) closeLightbox();
});

/* =================================================
   FRANCHISE HOME SEQUENCE
================================================= */
function runFranchiseSequence(){

  const points  = document.querySelectorAll(".fr-points .point");
  const desc    = document.querySelector(".fr-desc");
  const divider = document.querySelector(".fr-divider");
  const cards   = document.querySelectorAll(".fr-card");

  points.forEach(p=>p.style.animation="none");
  cards.forEach(c=>c.style.animation="none");
  if(desc) desc.style.animation="none";
  if(divider) divider.style.animation="none";

  void document.body.offsetHeight;

  let delay = 0;

  points.forEach(p=>{
    p.style.animation = `fadeUp .7s ease forwards`;
    p.style.animationDelay = `${delay += 0.4}s`;
  });

  if(desc){
    desc.style.animation = `fadeUp .8s ease forwards`;
    desc.style.animationDelay = `${delay += 0.6}s`;
  }

  if(divider){
    divider.style.animation = `lineGrow 1s ease forwards`;
    divider.style.animationDelay = `${delay += 0.5}s`;
  }

  cards.forEach(c=>{
    c.style.animation = `fadeUp .7s ease forwards`;
    c.style.animationDelay = `${delay += 0.18}s`;
  });
}

/* =================================================
   OPEN FRANCHISE DETAIL
================================================= */
function openDetail(type){

  document.getElementById("franchise-home").style.display = "none";
  const detail = document.getElementById("franchise-detail");
  detail.style.display = "block";

  document.getElementById("franchise-content").innerHTML =
    getFranchiseContent(type);

  if(type === "about"){
    setTimeout(runAboutAnimation,200);
  }

  if(type === "overview"){
    setTimeout(runOverviewAnimation,200);
  }


if(type === "opportunity"){
  setTimeout(runOpportunityAnimation,200);
}
if(type === "advantage"){
  setTimeout(runAdvantageAnimation,200);
}

if(type === "apart"){
  setTimeout(runApartAnimation,200);
}
if(type==="why") setTimeout(runWhyAnimation,200);
if(type==="cafe" || type==="express") setTimeout(runModelAnimation,200);
if(type==="steps") setTimeout(runStepsAnimation,200);
if(type === "support"){
  setTimeout(runSupportAnimation,200);
}


}
/* =================================================
   BACK TO FRANCHISE HOME
================================================= */
function backToFranchise(){
  document.getElementById("franchise-detail").style.display = "none";
  document.getElementById("franchise-home").style.display = "block";
  runFranchiseSequence();
}

/* =================================================
   FRANCHISE CONTENT
================================================= */
function getFranchiseContent(type){

  /* ================= ABOUT US ================= */
  if(type === "about"){
    return `
      <button class="back-btn" onclick="backToFranchise()">← Back</button>

      <div class="fr-about">
        <h2>ABOUT <span>US</span></h2>

        <div class="fr-about-points">
          <div class="fr-about-line">
            Café Illusions is the brainchild of an IIM Kolkata alumnus,
            backed by years of leadership experience in a Fortune 500
            F&B company.
          </div>

          <div class="fr-about-line">
            A vibrant brand on a strong growth trajectory, expanding
            rapidly across the country with consistent positive results.
          </div>

          <div class="fr-about-line">
            Illusions brings a world-class food & beverage retail
            experience to tier 2 & 3 cities, empowering entrepreneurs
            with an affordable and profitable business model.
          </div>
        </div>
      </div>
    `;
  }

  /* ================= OVERVIEW ================= */
  if(type === "overview"){
    return `
      <button class="back-btn" onclick="backToFranchise()">← Back</button>

      <div class="fr-overview">
        <h2>OVER<span>VIEW</span></h2>

        <p class="fr-overview-desc">
          A perfect place for friends and family, Illusions is one of the
          oldest and most sought-after casual dining restaurants known
          for its superior service and delectable food.
        </p>

        <div class="fr-overview-grid">
          <div class="ov-card"><h4>Started</h4><p>2011</p></div>
          <div class="ov-card"><h4>Format</h4><p>Café</p></div>
          <div class="ov-card"><h4>Cuisine</h4><p>Italian, Indian, Asian</p></div>
          <div class="ov-card"><h4>Positioning</h4><p>Family & Friends</p></div>
          <div class="ov-card"><h4>Locations</h4><p>Metro & Tier 1</p></div>
          <div class="ov-card"><h4>Typical Format</h4><p>1200–2000 sq.ft<br>80–120 covers</p></div>
          <div class="ov-card"><h4>Average Spend</h4><p>INR 700+</p></div>
          <div class="ov-card"><h4>Brand Type</h4><p>Premium Casual Dining</p></div>
        </div>
      </div>
    `;
  }
/* ================= OPPORTUNITY & CHALLENGES ================= */
if(type === "opportunity"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-oc">

      <h2>F&B :- <span>OPPORTUNITY / CHALLENGES</span></h2>

      <!-- OPPORTUNITIES -->
      <h3 class="oc-sub">Opportunities</h3>

      <div class="oc-list">
        <div class="oc-line">
          <b>Untapped Market Potential</b>
          <p>India’s F&B sector is still smaller compared to China & global markets.</p>
        </div>

        <div class="oc-line">
          <b>Rising Disposable Income</b>
          <p>Growing middle-class and youth with higher spending power.</p>
        </div>

        <div class="oc-line">
          <b>Café & Dining Culture</b>
          <p>Strong shift toward eating out, social cafés, and lifestyle dining.</p>
        </div>

        <div class="oc-line">
          <b>Tier 2 & 3 Cities Growth</b>
          <p>Rapid urbanization, less competition, and increasing aspirations.</p>
        </div>

        <div class="oc-line">
          <b>Franchise Boom</b>
          <p>Entrepreneurs seeking proven, low-risk models with strong ROI.</p>
        </div>
      </div>

      <!-- CHALLENGES -->
      <h3 class="oc-sub">Challenges</h3>

      <div class="oc-list">
        <div class="oc-line">
          <b>High Competition</b>
          <p>Local players & global brands expanding aggressively.</p>
        </div>

        <div class="oc-line">
          <b>Real Estate & Rentals</b>
          <p>Premium locations are costly in metro cities.</p>
        </div>

        <div class="oc-line">
          <b>Supply Chain Issues</b>
          <p>Maintaining quality & consistency across regions.</p>
        </div>

        <div class="oc-line">
          <b>Changing Consumer Preferences</b>
          <p>Demand for innovation and health-conscious menus.</p>
        </div>

        <div class="oc-line">
          <b>Operational Expertise</b>
          <p>Requires strong training, systems, and brand support.</p>
        </div>
      </div>

    </div>
  `;
}
/* ================= ILLUSIONS ADVANTAGE ================= */
if(type === "advantage"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-adv">

      <h2>ILLUSIONS <span>ADVANTAGE</span></h2>

      <div class="adv-list">

        <div class="adv-line">
          <b>Proven Retail Expertise</b>
          <p>Backed by years of successful operations.</p>
        </div>

        <div class="adv-line">
          <b>Researched & Crafted Menus</b>
          <p>Designed to match diverse tastes and preferences.</p>
        </div>

        <div class="adv-line">
          <b>Standardization of Product Quality</b>
          <p>Strong SOPs in place for consistency.</p>
        </div>

        <div class="adv-line">
          <b>Smart & Automated Operations</b>
          <p>Customer app, mobile ordering, loyalty program, feedback system & KDS.</p>
        </div>

        <div class="adv-line">
          <b>A Franchise You Can Trust</b>
          <p>Backed by 13 years of expertise.</p>
        </div>

        <div class="adv-line">
          <b>Trademark & Brand Protection</b>
          <p>Registered under the Trade Marks Act, 1999.</p>
        </div>

        <div class="adv-line">
          <b>Maximization of Resources</b>
          <p>Low investment with high returns.</p>
        </div>

        <div class="adv-line">
          <b>Continuous Activation Support</b>
          <p>Ongoing brand & operational support.</p>
        </div>

        <div class="adv-line">
          <b>Focus on Service Quality</b>
          <p>Consistent service excellence across outlets.</p>
        </div>

        <div class="adv-line">
          <b>International Hygiene Protocols</b>
          <p>Strictly followed across all locations.</p>
        </div>

      </div>
    </div>
  `;
}
/* ================= WHAT SETS US APART ================= */
if(type === "apart"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-apart">

      <h2>What Sets <span>Us Apart?</span></h2>

      <div class="apart-list">

        <div class="apart-line">
          <b>Trusted Brand Name</b>
          <p>A well-established and reputed identity in the F&B industry.</p>
        </div>

        <div class="apart-line">
          <b>Premium Equipments</b>
          <p>Branded dispensing machines ensuring consistent, high-quality food & beverages.</p>
        </div>

        <div class="apart-line">
          <b>Expertly Curated Menu</b>
          <p>Designed by top culinary consultants tailored to Indian tastes.</p>
        </div>

        <div class="apart-line">
          <b>Unmatched Customer Experience & Quality</b>
          <p>Known for service standards and superior product quality.</p>
        </div>

      </div>
    </div>
  `;
}
/* ================= WHY CHOOSE OUR FRANCHISE ================= */
if(type === "why"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-why">

      <h2>Why Choose <span>Our Franchise?</span></h2>

      <div class="why-list">
        <div class="why-line">
          <b>Profitable Investment</b>
          <p>Strong ROI with a proven business model.</p>
        </div>

        <div class="why-line">
          <b>Powerful Brand</b>
          <p>Leverage a reputed and established name in the F&B industry.</p>
        </div>

        <div class="why-line">
          <b>Step-by-Step Guidance</b>
          <p>From site selection to store launch, we’re with you.</p>
        </div>

        <div class="why-line">
          <b>Comprehensive Training</b>
          <p>Learn operations directly at our outlets.</p>
        </div>

        <div class="why-line">
          <b>Strong Marketing Support</b>
          <p>Aggressive social media & brand campaigns to drive sales.</p>
        </div>

        <div class="why-line">
          <b>Operational Ease</b>
          <p>Detailed manuals & expert assistance for smooth setup.</p>
        </div>

        <div class="why-line">
          <b>Ongoing Support</b>
          <p>Continued guidance even after your franchise is live.</p>
        </div>
      </div>
    </div>
  `;
}
/* ================= ILLUSIONS CAFE MODEL ================= */
if(type === "cafe"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-model">

      <h2>ILLUSIONS <span>CAFÉ MODEL</span></h2>

      <h3 class="model-sub">Franchise Requirement</h3>
      <div class="model-list">
        <div class="model-line"><b>Area</b><p>Minimum 1200 Sq ft</p></div>
        <div class="model-line"><b>Rental Agreement</b><p>Mandatory</p></div>
        <div class="model-line"><b>Power Requirement</b><p>Approx 25 kW</p></div>
        <div class="model-line"><b>Licenses & Permissions</b><p>As per statutory norms</p></div>
        <div class="model-line"><b>Manpower</b><p>9 staff (2 shifts)</p></div>
      </div>

      <h3 class="model-sub">Franchise Facts</h3>
      <div class="model-list">
        <div class="model-line"><b>Investment</b><p>₹25 – 30 Lakhs *</p></div>
        <div class="model-line"><b>Fit-out Cost</b><p>Approx ₹3,500 / sq ft</p></div>
        <div class="model-line"><b>Franchise Fee</b><p>₹8,00,000 #</p></div>
        <div class="model-line"><b>Menu</b><p>Full exhaustive menu</p></div>
      </div>

      <p class="model-note">
        * Including rental & permission cost <br>
        # One-time non-refundable fee (GST extra)
      </p>
    </div>
  `;
}
/* ================= ILLUSIONS EXPRESS MODEL ================= */
if(type === "express"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-model">

      <h2>ILLUSIONS <span>EXPRESS MODEL</span></h2>

      <h3 class="model-sub">Franchise Requirement</h3>
      <div class="model-list">
        <div class="model-line"><b>Area</b><p>Minimum 600 Sq ft</p></div>
        <div class="model-line"><b>Rental Agreement</b><p>Mandatory</p></div>
        <div class="model-line"><b>Power Requirement</b><p>Approx 12 kW</p></div>
        <div class="model-line"><b>Licenses & Permissions</b><p>As per statutory norms</p></div>
        <div class="model-line"><b>Manpower</b><p>5 staff (2 shifts)</p></div>
      </div>

      <h3 class="model-sub">Franchise Facts</h3>
      <div class="model-list">
        <div class="model-line"><b>Investment</b><p>₹13 – 14 Lakhs *</p></div>
        <div class="model-line"><b>Fit-out Cost</b><p>Approx ₹3,500 / sq ft</p></div>
        <div class="model-line"><b>Franchise Fee</b><p>₹5,00,000 #</p></div>
        <div class="model-line"><b>Menu</b><p>Express menu</p></div>
      </div>

      <p class="model-note">
        * Including rental & permission cost <br>
        # One-time non-refundable fee (GST extra)
      </p>
    </div>
  `;
}
/* ================= STEPS FOR SETTING FRANCHISE ================= */
if(type === "steps"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-steps">
      <h2>STEPS FOR <span>SETTING FRANCHISE</span></h2>

      <div class="steps-list">
        <div class="step-line">Preliminary Meeting & Discussion</div>
        <div class="step-line">Site Visit</div>
        <div class="step-line">Site Finalization & Franchise Cost Finalization</div>
        <div class="step-line">Release of 100% Franchise Fees & Agreement Sign-up</div>
        <div class="step-line">Initiation of Site Design & Fabrication</div>
        <div class="step-line">Ordering for Machines & Equipment</div>
        <div class="step-line">Handover of Completed Outlet</div>
        <div class="step-line">10 Days Training of Staff at Company Outlet</div>
        <div class="step-line">Launch of the Outlet</div>
      </div>
    </div>
  `;
}
/* ================= FRANCHISE SUPPORT (FLOWCHART) ================= */
if(type === "support"){
  return `
    <button class="back-btn" onclick="backToFranchise()">← Back</button>

    <div class="fr-support">
      <h2>FRANCHISE <span>SUPPORT</span></h2>

      <div class="flowchart">

        <div class="flow-step red">Franchise Sign Up</div>
        <div class="flow-arrow">↓</div>

        <div class="flow-step green">Site Selection</div>
        <div class="flow-arrow">↓</div>

        <div class="flow-step purple">Store Design</div>
        <div class="flow-arrow">↓</div>

        <div class="flow-step blue">Site Execution</div>
        <div class="flow-arrow">↓</div>

        <div class="flow-step orange">Training – Operations</div>
        <div class="flow-arrow">↓</div>

        <div class="flow-step red">Vendor Assistance</div>
        <div class="flow-arrow">↓</div>

        <div class="flow-step green">One Month Company Supervision</div>

      </div>
    </div>
  `;
}

  /* ================= DEFAULT ================= */
  return `
    <button class="back-btn" onclick="backToFranchise()">←</button>
    <h2>${type.toUpperCase()}</h2>
    <p>.</p>
  `;
}

/* =================================================
   ABOUT US – LINE BY LINE ANIMATION
================================================= */
function runAboutAnimation(){
  const lines = document.querySelectorAll(".fr-about-line");

  lines.forEach(l=>l.classList.remove("show"));
  void document.body.offsetHeight;

  let delay = 0;
  lines.forEach(l=>{
    setTimeout(()=>{
      l.classList.add("show");
    }, delay += 450);
  });
}

/* =================================================
   OVERVIEW – BLOCK BY BLOCK ANIMATION
================================================= */
function runOverviewAnimation(){

  const desc  = document.querySelector(".fr-overview-desc");
  const cards = document.querySelectorAll(".ov-card");

  if(desc){
    desc.classList.remove("show");
    void desc.offsetHeight;
    setTimeout(()=>desc.classList.add("show"),200);
  }

  let delay = 0;
  cards.forEach(card=>{
    card.classList.remove("show");
    void card.offsetHeight;
    setTimeout(()=>{
      card.classList.add("show");
    }, delay += 250);
  });
}
/* =================================================
   OPPORTUNITY & CHALLENGES – LINE ANIMATION
================================================= */
function runOpportunityAnimation(){

  const lines = document.querySelectorAll(".oc-line");

  lines.forEach(l=>l.classList.remove("show"));
  void document.body.offsetHeight;

  let delay = 0;
  lines.forEach(l=>{
    setTimeout(()=>{
      l.classList.add("show");
    }, delay += 300);
  });
}
/* =================================================
   ILLUSIONS ADVANTAGE – ANIMATION
================================================= */
function runAdvantageAnimation(){
  const lines = document.querySelectorAll(".adv-line");

  lines.forEach(l=>l.classList.remove("show"));
  void document.body.offsetHeight;

  let delay = 0;
  lines.forEach(l=>{
    setTimeout(()=>{
      l.classList.add("show");
    }, delay += 280);
  });
}

/* =================================================
   WHAT SETS US APART – ANIMATION
================================================= */
function runApartAnimation(){
  const lines = document.querySelectorAll(".apart-line");

  lines.forEach(l=>l.classList.remove("show"));
  void document.body.offsetHeight;

  let delay = 0;
  lines.forEach(l=>{
    setTimeout(()=>{
      l.classList.add("show");
    }, delay += 350);
  });
}
/* =================================================
   WHY / MODEL ANIMATIONS
================================================= */
function runWhyAnimation(){
  animateLines(".why-line",300);
}

function runModelAnimation(){
  animateLines(".model-line",260);
  const note=document.querySelector(".model-note");
  if(note){
    setTimeout(()=>note.classList.add("show"),900);
  }
}

/* REUSABLE */
function animateLines(selector, gap){
  const lines=document.querySelectorAll(selector);
  lines.forEach(l=>l.classList.remove("show"));
  void document.body.offsetHeight;

  let d=0;
  lines.forEach(l=>{
    setTimeout(()=>l.classList.add("show"), d+=gap);
  });
}
/* =================================================
   STEPS ANIMATION (SAME AS BEFORE)
================================================= */
function runStepsAnimation(){
  animateLines(".step-line",260);
}

/* =================================================
   FRANCHISE SUPPORT – FLOWCHART ANIMATION
================================================= */
function runSupportAnimation(){

  const items = document.querySelectorAll(".flow-step, .flow-arrow");

  items.forEach(i=>i.classList.remove("show"));
  void document.body.offsetHeight;

  let delay = 0;
  items.forEach(i=>{
    setTimeout(()=>{
      i.classList.add("show");
    }, delay += 180);
  });
}/* =================================================
   MAIN ABOUT PAGE – SAFE WORD BY WORD ANIMATION
================================================= */

function runMainAboutAnimation(){

  const container = document.querySelector("#about .reveal-text");
  if(!container) return;

  /* BADGE */
  const badge = container.querySelector(".about-badge");
  badge.classList.remove("show");

  /* PARAGRAPHS ONLY */
  const paragraphs = container.querySelectorAll("p");

  // reset
  paragraphs.forEach(p=>{
    p.innerHTML = p.textContent;
  });

  // word split
  paragraphs.forEach(p=>{
    const words = p.textContent.split(" ");
    p.innerHTML = words

      .map(word => `<span class="word">${word}</span>`)
      .join(" ");
  });

  // show badge first
  setTimeout(()=>{
    badge.classList.add("show");
  }, 200);

  // animate words
  const words = container.querySelectorAll(".word");
  let i = 0;

  const interval = setInterval(()=>{
    if(i >= words.length){
      clearInterval(interval);
      return;
    }
    words[i].classList.add("show");
    i++;
  }, 38);
}
function goToAbout(e){
  e.preventDefault();      // niche scroll hone se roke
  openPage('about');       // about page open
  window.scrollTo(0,0);    // top se dikhe
}
function animateHero(){

  document.querySelectorAll(".reveal-hero").forEach(el=>{

    const text = el.innerText;
    el.innerHTML = "";

    text.split(" ").forEach((word,i)=>{
      const span = document.createElement("span");
      span.className = "word";
      span.innerText = word + " ";
      span.style.animationDelay = `${i * 0.12}s`;
      el.appendChild(span);
    });

    el.style.opacity = 1;
  });

}
function toggleMenu(){
  document.querySelector(".header-nav").classList.toggle("active");
}
// close mobile menu after click
document.querySelectorAll(".mobile-nav-link").forEach(link => {
  link.addEventListener("click", () => {

    // sirf mobile ke liye
    if (window.innerWidth <= 900) {
      const nav = document.querySelector(".header-nav");
      nav.classList.remove("active");
    }

  });
});


/* =================================================
   DEFAULT LOAD
================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  openPage("home");
});
