import { Link, useLocation, useParams } from "react-router-dom";
import { AdLink, PromoCard, Shell } from "./components-gam";
import { carArticles, healthArticles, pageMap } from "./siteData";

const Para = ({ children }) => <p>{children}</p>;
export function Home() {
  return (
    <Shell>
      <PromoCard>
        <h2>Play Free Games on 5minutes games</h2>
        <AdLink to="/play">Play Now</AdLink>
      </PromoCard>
      <h1 className="main-title">
        Top Finance Plans: Car, Health, Life, and More
      </h1>
      <PromoCard>
        <h2>Get exclusive insurance info</h2>
        <div className="button-row">
          <AdLink to="/en/carFinance">Car</AdLink>
          <AdLink to="/en/healthFinance">Health</AdLink>
        </div>
      </PromoCard>
      <article className="home-copy">
        <h2>Find the Best Finance for Every Need</h2>
        <Para>
          The right insurance plan offers peace of mind and financial security.
          Whether you are looking for health insurance plans, online car
          insurance, or a term life insurance policy, choosing the best provider
          ensures maximum benefits. Here, we explore the main types of insurance
          policies and the key benefits you should consider.
        </Para>
        <h2>Comprehensive Health Finance Plans</h2>
        <Para>
          Health insurance is essential for managing medical expenses. Major
          providers offer options such as:
        </Para>
        <ol>
          <li>
            <b>Health Care Finance:</b> Known for its extensive network of
            hospitals, this plan guarantees cashless treatment for insured
            individuals.
          </li>
          <li>
            <b>Family Health Finance:</b> Designed for families, this type of
            plan covers multiple members with a single premium.
          </li>
          <li>
            <b>Private Medical Finance:</b> Get access to top-notch healthcare
            facilities without long waiting times.
          </li>
          <li>
            <b>Mediclaim Policy:</b> A medical insurance policy reimburses
            hospitalization expenses, providing financial relief during
            emergencies.
          </li>
          <li>
            Whether you choose <b>HDFC ERGO Health Finance</b> or a plan from
            another provider, ensure it meets your healthcare needs.
          </li>
        </ol>
        <h2>Car Finance: Protect Your Vehicle</h2>
        <Para>
          Car insurance is essential for all vehicle owners. Here are some
          popular options:
        </Para>
        <ol>
          <li>
            <b>Tata AIG Car Finance:</b> Offers comprehensive and third-party
            car insurance plans with competitive pricing.
          </li>
          <li>
            <b>Acko Car Finance:</b> Known for its digital-first approach, Acko
            simplifies car insurance online.
          </li>
          <li>
            <b>Car Finance Quotes:</b> Comparing quotes helps you choose the
            most affordable and effective policy.
          </li>
          <li>
            From <b>cheap car insurance</b> to premium coverage, the right
            policy ensures your car remains protected against accidents and
            theft.
          </li>
        </ol>
        <h2>Secure Your Future with Life Finance</h2>
        <Para>
          <b>Life insurance</b> provides financial support to your loved ones in
          case of unforeseen events. Explore these options:
        </Para>
        <ol>
          <li>
            <b>Term Life Finance:</b> A cost-effective way to secure your
            family's future with high coverage amounts.
          </li>
          <li>
            <b>Life Finance Policy:</b> Includes a variety of plans like Maxlife
            Finance, offering investment and protection benefits.
          </li>
          <li>
            <b>Life Finance Quotes:</b> Requesting quotes helps you compare
            policies to find one that matches your budget.
          </li>
        </ol>
        <h2>Travel Finance: Peace of Mind on the Go</h2>
        <Para>
          Frequent travelers should consider travel insurance to protect against
          unexpected events during trips. Policies cover:
        </Para>
        <ul>
          <li>Flight cancellations</li>
          <li>Lost baggage</li>
          <li>Medical emergencies abroad</li>
        </ul>
        <Para>
          By comparing travel insurance plans, you can ensure hassle-free
          journeys every time.
        </Para>
        <h2>Specialty Finance for Businesses and Homes</h2>
        <Para>
          Finance isn't limited to personal needs. Businesses can benefit from
          public liability insurance or professional indemnity insurance, while
          homeowners can explore home insurance or house insurance for property
          protection.
        </Para>
        <h2>Choosing the Best Finance Provider</h2>
        <Para>
          When selecting an insurance provider, look for companies with a strong
          reputation, competitive rates, and excellent customer service.
          Providers like <b>TataAIG, HDFC ERGO,</b> and <b>Maxlife Finance</b>{" "}
          consistently rank among the best for their diverse range of policies
          and commitment to customer satisfaction.
        </Para>
        <h2>Start Your Finance Journey Today</h2>
        <Para>
          From <b>medical insurance</b> to <b>car insurance quotes</b>, there’s
          an insurance plan for every need. Compare options, request quotes, and
          select a policy that aligns with your lifestyle and budget. Secure
          your future today with the right coverage!
        </Para>
        <Link className="more-button" to="/en/carFinance">
          More
        </Link>
      </article>
    </Shell>
  );
}

function HubPage({ kind }) {
  const items = kind === "car" ? carArticles : healthArticles;
  const title = kind === "car" ? "Car Finance" : "Health Insurance";
  return (
    <Shell>
      <h1 className="hub-title">{title}</h1>
      <div className="topic-list">
        {Object.entries(items).map(([slug, item]) => (
          <Link
            key={slug}
            to={`/en/${kind === "car" ? "carFinance" : "healthFinance"}/${slug}`}
          >
            <span>{item.title}</span>
            <b>›</b>
          </Link>
        ))}
      </div>
    </Shell>
  );
}
export function Hub() {
  return null;
}

function ThirdPartyLiabilityArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article">
        <h1>Third-Party Liability Only Cover</h1>
        <section>
          <h2>What is Third-Party Liability Only Finance?</h2>
          <Para>Third-Party Liability Only Cover is a type of car insurance that provides financial protection if you cause damage to another person, their vehicle, or property. It does not cover any damage to your own car. This is the most basic and legally required form of car insurance in most countries.</Para>
        </section>
        <section>
          <h2>Coverage Details</h2>
          <h3 className="covered-heading"><span>✓</span> What is Covered?</h3>
          <ol>
            <li><strong>Bodily Injury or Death:</strong> Covers medical expenses, disability, or death compensation for third parties involved in an accident caused by your vehicle.</li>
            <li><strong>Property Damage:</strong> Pays for repairs or replacement of another person's vehicle, buildings, or public property damaged in an accident.</li>
            <li><strong>Legal Liabilities:</strong> Covers legal expenses if a third party sues you for injury or property damage.</li>
          </ol>
          <h3 className="not-covered-heading"><span>×</span> What is NOT Covered?</h3>
          <ol>
            <li><strong>Damage to Your Own Car:</strong> Repairs or replacement of your vehicle are not included.</li>
            <li><strong>Theft or Fire Damage:</strong> If your car is stolen or damaged by fire, you won't get any compensation.</li>
            <li><strong>Personal Medical Expenses:</strong> Your injuries or medical costs are not covered.</li>
            <li><strong>Natural Disasters &amp; Vandalism:</strong> Damage from floods, earthquakes, riots, or vandalism is excluded.</li>
            <li><strong>Driving Under Influence (DUI) or Illegal Use:</strong> Accidents caused while driving under alcohol/drugs or without a valid license are not covered.</li>
          </ol>
        </section>
        <section>
          <h2>Who Should Get Third-Party Liability Only Finance?</h2>
          <ol>
            <li><strong>People Looking for Budget-Friendly Finance:</strong> It's the cheapest legal option.</li>
            <li><strong>Owners of Older Cars:</strong> If your car’s value is low, it may not be worth insuring with comprehensive coverage.</li>
            <li><strong>Minimal Car Users:</strong> If you rarely drive, a basic policy may be enough.</li>
            <li><strong>First-Time Drivers:</strong> If you're new to driving and want to stay legally compliant without high costs.</li>
          </ol>
        </section>
        <section>
          <h2>Cost of Third-Party Liability Finance</h2>
          <ul>
            <li>Premiums are lower than comprehensive finance.</li>
            <li>Cost depends on vehicle type, location, driver history, and insurance regulations.</li>
            <li>No Claim Bonus (NCB) is not usually available for this type of finance.</li>
          </ul>
        </section>
        <section>
          <h2>Conclusion</h2>
          <Para>Third-Party Liability Only Finance is a <strong>basic, legally required cover</strong> that protects you from financial liabilities to others but <strong>does not cover your own vehicle.</strong> It is an affordable option but has limited benefits. If you want broader protection, comprehensive insurance is a better choice. From medical insurance to car insurance quotes, there’s an insurance plan for every need. Compare options, request quotes, and select a policy that aligns with your lifestyle and budget. Secure your future today with the right coverage!</Para>
        </section>
      </article>
    </Shell>
  );
}

function OwnDamageArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article own-damage-article">
        <h1>Own Damage (OD) Cover</h1>
        <Para><strong>Own Damage (OD) Cover</strong> is a type of car insurance that protects the insured vehicle against damages due to accidents, theft, fire, and natural disasters. It is different from Third-Party Finance, which only covers damages to others.</Para>
        <section>
          <h2>Coverage of OD Finance</h2>
          <ol>
            <li><strong>Accidental Damages:</strong> Covers repair costs if your car is damaged in an accident.</li>
            <li><strong>Fire &amp; Explosion:</strong> Compensation for damages due to fire, lightning, or explosions.</li>
            <li><strong>Theft &amp; Burglary:</strong> Covers financial loss if the car is stolen.</li>
            <li><strong>Natural Disasters:</strong> Protection against floods, earthquakes, storms, etc.</li>
            <li><strong>Man-Made Disasters:</strong> Covers damages due to riots, strikes, vandalism, and terrorism.</li>
            <li><strong>Transit Damages:</strong> Protection against damages during transportation by rail, road, or water.</li>
          </ol>
        </section>
        <section>
          <h2>What Is Not Covered by OD Finance?</h2>
          <ul>
            <li>Third-Party Liabilities (injury or damage to others)</li>
            <li>Mechanical or Electrical Breakdown</li>
            <li>Regular Wear and Tear</li>
            <li>Driving Without a License or Under Influence</li>
            <li>Damage Outside Policy Coverage Period</li>
          </ul>
        </section>
        <section>
          <h2>Eligibility for OD Cover</h2>
          <ul>
            <li>Available only for cars with an active Third-Party Finance policy.</li>
            <li>Mandatory for new vehicles for the first 3 years as per Indian regulations.</li>
            <li>Can be purchased as a standalone policy or as part of a Comprehensive Policy.</li>
          </ul>
        </section>
        <section>
          <h2>Add-On Covers Available with OD Finance</h2>
          <ol>
            <li><strong>Zero Depreciation Cover:</strong> Full claim amount without depreciation deduction.</li>
            <li><strong>Roadside Assistance:</strong> Help in case of breakdowns or flat tires.</li>
            <li><strong>Engine Protection:</strong> Covers engine damages due to waterlogging or oil leaks.</li>
            <li><strong>No-Claim Bonus (NCB) Protection:</strong> Retains NCB benefits even after a claim.</li>
          </ol>
        </section>
      </article>
    </Shell>
  );
}

function PersonalAccidentArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article personal-accident-article">
        <h1>Personal Accident Cover in Car Finance</h1>
        <Para><strong>Personal Accident (PA) Cover</strong> is a car insurance policy that provides financial protection to the policyholder (driver) and passengers in case of accidental injuries, disability, or death. It is mandatory in many countries, including India, for vehicle owners.</Para>
        <section>
          <h2>Coverage of PA Finance</h2>
          <ol>
            <li><strong>Accidental Death:</strong> Provides a lump sum amount to the nominee if the insured dies in a car accident.</li>
            <li><strong>Permanent Total Disability (PTD):</strong> Covers full disability (e.g., loss of both limbs, eyesight, or paralysis).</li>
            <li><strong>Permanent Partial Disability (PPD):</strong> Compensation for partial disabilities like loss of one limb or reduced mobility.</li>
            <li><strong>Temporary Total Disability (TTD) (Optional):</strong> Provides weekly compensation if the insured is unable to work temporarily.</li>
            <li><strong>Medical Expenses Cover:</strong> Reimburses hospitalization, surgeries, and rehabilitation costs.</li>
            <li><strong>Passenger Cover (Optional Add-on):</strong> Extends coverage to co-passengers in the vehicle.</li>
            <li><strong>Funeral &amp; Transportation Costs:</strong> Covers the cost of cremation or burial and transportation of the deceased.</li>
          </ol>
        </section>
        <section>
          <h2>Exclusions (What is NOT Covered?)</h2>
          <ul>
            <li><strong>Drunk Driving or Driving Without a License</strong></li>
            <li><strong>Intentional Self-Injury or Suicide Attempts</strong></li>
            <li><strong>Accidents Due to Illegal Activities (Racing, Stunts, etc.)</strong></li>
            <li><strong>Pre-existing Conditions or Natural Death</strong></li>
            <li><strong>Injuries from War, Terrorist Acts, or Nuclear Risks</strong></li>
          </ul>
        </section>
        <section>
          <h2>Who Needs a PA Cover?</h2>
          <ol>
            <li><strong>Car Owners &amp; Drivers:</strong> Mandatory in many regions like India.</li>
            <li><strong>Frequent Travelers:</strong> Those who drive long distances regularly.</li>
            <li><strong>Passengers:</strong> Families or business travelers can opt for additional coverage.</li>
          </ol>
        </section>
        <section>
          <h2>Types of PA Cover in India</h2>
          <ol>
            <li><strong>Mandatory PA Cover:</strong> Required for vehicle owners with a minimum ₹15 lakh coverage.</li>
            <li><strong>Standalone PA Cover:</strong> A separate policy that provides higher sum insured options.</li>
            <li><strong>PA Cover for Passengers:</strong> Optional add-on that protects co-passengers in the car.</li>
          </ol>
        </section>
      </article>
    </Shell>
  );
}

function UninsuredMotoristArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article uninsured-motorist-article">
        <h1>Uninsured Motorist Protection</h1>
        <Para><strong>Uninsured Motorist Protection (UM)</strong> is an auto insurance policy that covers you if you are involved in an accident with a driver who does not have insurance or flees the scene (hit-and-run). It also includes <strong>Underinsured Motorist (UIM) Coverage</strong>, which applies when the at-fault driver’s insurance is insufficient to cover your losses.</Para>
        <section>
          <h2>Types of Uninsured/Underinsured Motorist Coverage</h2>
          <ol>
            <li><strong>Uninsured Motorist Bodily Injury (UMBI)</strong><br />Covers medical expenses, lost wages, and pain &amp; suffering for you and passengers. Applies when the at-fault driver has no insurance or in hit-and-run cases.</li>
            <li><strong>Uninsured Motorist Property Damage (UMPD) (Varies by State)</strong><br />Pays for repairs to your vehicle if an uninsured driver damages it. Some states require a deductible before coverage applies. Not available in all states—some require collision coverage instead.</li>
            <li><strong>Underinsured Motorist Bodily Injury (UIMBI)</strong><br />Protects you when the at-fault driver has insurance but with low coverage limits. Pays the remaining medical expenses, lost wages, and damages.</li>
            <li><strong>Underinsured Motorist Property Damage (UIMPD) (Limited Availability)</strong><br />Covers car repairs if the at-fault driver’s insurance does not fully cover damages.</li>
          </ol>
        </section>
        <section>
          <h2>Why is UM/UIM Important?</h2>
          <ol>
            <li><strong>1 in 8 drivers in the U.S. is uninsured</strong> (Insurance Research Council).</li>
            <li>Some drivers <strong>carry only minimum liability coverage</strong>, which may not fully pay for damages.</li>
            <li>In hit-and-run cases, <strong>UMBI ensures you’re covered</strong> if the driver is never found.</li>
          </ol>
        </section>
        <section>
          <h2>Is UM/UIM Coverage Mandatory?</h2>
          <ol>
            <li><strong>Required in some states</strong> (e.g., New York, Illinois, North Carolina).</li>
            <li><strong>Optional in others</strong>, but highly recommended.</li>
          </ol>
        </section>
      </article>
    </Shell>
  );
}

function ComprehensiveCarArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article comprehensive-car-article">
        <h1>Comprehensive Car Finance</h1>
        <Para><strong>Comprehensive Car Finance</strong> is an all-inclusive policy that covers both third-party liabilities and own vehicle damages. It provides financial protection against accidents, theft, natural disasters, fire, vandalism, and more. Unlike third-party insurance, which only covers damages to others, comprehensive insurance ensures your vehicle is also protected.</Para>
        <section>
          <h2>Coverage of Comprehensive Car Finance</h2>
          <ol>
            <li><strong>Accidental Damage:</strong> Covers repair costs if your car is damaged in an accident.</li>
            <li><strong>Third-Party Liabilities:</strong> Pays for injury or property damage caused to others.</li>
            <li><strong>Theft &amp; Burglary:</strong> Compensation if your car is stolen or parts are stolen.</li>
            <li><strong>Fire &amp; Explosion:</strong> Covers damages due to fire, lightning, or explosions.</li>
            <li><strong>Natural Disasters:</strong> Protection from floods, earthquakes, storms, cyclones, etc.</li>
            <li><strong>Man-Made Disasters:</strong> Covers riots, vandalism, strikes, and terrorist activities.</li>
            <li><strong>Damage During Transit:</strong> Protection if your car is damaged during transport by road, rail, or water.</li>
          </ol>
        </section>
        <section>
          <h2>Exclusions (What Comprehensive Finance Does NOT Cover?)</h2>
          <ol>
            <li><strong>Driving Without a License:</strong> No coverage if the driver is unlicensed.</li>
            <li><strong>Drunk Driving or Drug Influence:</strong> Claims are denied if intoxicated.</li>
            <li><strong>Regular Wear and Tear:</strong> Mechanical failures and aging-related damages are not covered.</li>
            <li><strong>Intentional Damage or Fraud:</strong> No coverage if damage is caused deliberately.</li>
            <li><strong>Accidents Outside Policy Coverage:</strong> Damage occurring after the policy expires is not covered.</li>
          </ol>
        </section>
        <section>
          <h2>Add-On Covers Available with Comprehensive Finance</h2>
          <ol>
            <li><strong>Zero Depreciation Cover:</strong> Ensures full claim amount without depreciation deductions.</li>
            <li><strong>Roadside Assistance:</strong> Emergency support for breakdowns, towing, fuel refills, etc.</li>
            <li><strong>Engine Protection Cover:</strong> Covers damage due to waterlogging, oil leaks, or mechanical failures.</li>
            <li><strong>Personal Accident Cover:</strong> Compensation for medical expenses, disability, or death of the driver/passengers.</li>
            <li><strong>No-Claim Bonus (NCB) Protection:</strong> Retains NCB benefits even after making a claim.</li>
          </ol>
        </section>
        <section>
          <h2>Who Should Buy Comprehensive Finance?</h2>
          <ol>
            <li><strong>New &amp; Expensive Car Owners:</strong> High repair costs make coverage essential.</li>
            <li><strong>Frequent Drivers:</strong> More driving means higher accident risk.</li>
            <li><strong>Residents in Risky Areas:</strong> If you live in flood-prone or theft-prone regions.</li>
            <li><strong>Owners Seeking Complete Protection:</strong> Covers almost all possible risks.</li>
          </ol>
        </section>
      </article>
    </Shell>
  );
}

function PrivateHealthInsuranceArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article private-health-article">
        <h1>Private Health Insurance</h1>
        <Para><strong>Private Health Insurance</strong> refers to health coverage provided by private insurance companies rather than the government. It involves paying premiums in exchange for coverage of medical costs. Here’s a detailed look:</Para>
        <section>
          <h2>Key Features:</h2>
          <ol>
            <li><strong>Premiums:</strong> The amount you pay monthly or annually to maintain coverage. Costs can vary based on age, location, plan type, and coverage level.</li>
            <li><strong>Deductibles:</strong> The amount you pay for covered healthcare services before the insurance begins to pay.</li>
            <li><strong>Co-pays/Co-insurance:</strong> The share of the cost you pay for services after meeting your deductible.</li>
            <li><strong>Network:</strong> Insurance plans often have networks of preferred healthcare providers. Out-of-network care may result in higher costs.</li>
            <li><strong>Coverage:</strong> May include doctor visits, hospital stays, emergency care, preventive care, prescriptions, and more.</li>
            <li><strong>Out-of-Pocket Maximum:</strong> The most you will have to pay for covered services in a year. After reaching this amount, the plan pays 100% of the costs.</li>
          </ol>
        </section>
        <section>
          <h2>Types of Private Health Insurance:</h2>
          <ul>
            <li><strong>Individual Plans:</strong> Coverage bought by individuals, not through an employer or group.</li>
            <li><strong>Family Plans:</strong> Covers an individual and their family members.</li>
            <li><strong>Employer-Sponsored Plans:</strong> Offered through an employer, often with shared premium costs.</li>
          </ul>
        </section>
        <section>
          <h2>Advantages:</h2>
          <ol>
            <li><strong>Customization:</strong> Flexible options to choose a plan that fits personal health needs.</li>
            <li><strong>Access to Better Care:</strong> Many private plans offer faster access to healthcare professionals and services.</li>
            <li><strong>Wide Range of Services:</strong> May cover a broader spectrum of services, including specialist visits, elective surgeries, and alternative medicine.</li>
          </ol>
        </section>
        <section>
          <h2>Disadvantages</h2>
          <ol>
            <li><strong>Cost:</strong> Private insurance can be expensive, especially with high premiums, co-pays, or deductibles.</li>
            <li><strong>Complexity:</strong> Navigating plans, networks, and coverage options can be challenging for some consumers.</li>
          </ol>
        </section>
      </article>
    </Shell>
  );
}

function PublicHealthInsuranceArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article public-health-article">
        <h1>Public Health Insurance</h1>
        <Para><strong>Public Health Insurance</strong> refers to health coverage that is funded and managed by government programs. It aims to make healthcare more affordable and accessible to a broader population. Here’s a detailed look at the main types of public health insurance:</Para>
        <section>
          <h2>Types of Public Health Insurance:</h2>
          <ol className="policy-types">
            <li><strong>Medicare (U.S.):</strong>
              <ul>
                <li><strong>Eligibility:</strong> Primarily for individuals aged 65+ or younger individuals with disabilities.</li>
                <li><strong>Coverage:</strong> Includes hospital insurance (Part A), medical insurance (Part B), and options for prescription drug coverage (Part D).</li>
                <li><strong>Cost:</strong> Beneficiaries pay premiums, deductibles, and co-pays. Part A is usually free for those who paid Medicare taxes while working.</li>
              </ul>
            </li>
            <li><strong>Medicaid:</strong>
              <ul>
                <li><strong>Eligibility:</strong> For low-income individuals and families, including children, pregnant women, elderly, and people with disabilities.</li>
                <li><strong>Coverage:</strong> Provides comprehensive services such as hospital visits, doctor visits, preventive care, prescription drugs, and more.</li>
                <li><strong>Cost:</strong> Coverage is often free or low-cost, with varying out-of-pocket costs depending on income.</li>
              </ul>
            </li>
            <li><strong>State-Specific Public Health Insurance:</strong>
              <ul>
                <li>States may offer additional public insurance programs that expand on Medicaid, such as the <strong>Children’s Health Insurance Program (CHIP)</strong>, which covers children in low-income families.</li>
              </ul>
            </li>
            <li><strong>National Health Service (NHS):</strong>
              <ul>
                <li><strong>Eligibility:</strong> Available to all U.K. residents.</li>
                <li><strong>Coverage:</strong> Comprehensive coverage including doctor visits, hospital stays, emergency care, mental health services, and some prescription medications.</li>
                <li><strong>Cost:</strong> Most services are free at the point of use; however, there are costs for prescriptions and certain services (e.g., dental care).</li>
                <li><strong>Funding:</strong> Primarily funded by taxes.</li>
              </ul>
            </li>
            <li><strong>Universal Health Coverage (Various Countries):</strong>
              <ul>
                <li>Countries like <strong>Canada, Australia</strong>, and several European nations offer single-payer healthcare or universal health systems, where the government provides healthcare services funded through taxes.</li>
                <li><strong>Eligibility:</strong> Available to all residents of the country.</li>
                <li><strong>Coverage:</strong> Includes most healthcare needs, but certain services (like dental or optical) might require additional private coverage or out-of-pocket payments.</li>
                <li><strong>Cost:</strong> Generally low to no direct costs for patients at the point of care, but funded through taxes or contributions.</li>
              </ul>
            </li>
            <li><strong>Social Health Insurance:</strong>
              <ul>
                <li><strong>Eligibility:</strong> Citizens are required to be covered through a government-managed, yet privately delivered system.</li>
                <li><strong>Coverage:</strong> Comprehensive healthcare services are covered, with a focus on ensuring quality care across the population.</li>
                <li><strong>Cost:</strong> People contribute based on their income, with premiums typically shared between employers and employees.</li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <h2>Key Considerations:</h2>
          <ul>
            <li>Public health insurance is a good option for those who cannot afford private health insurance, or for those who prefer a system with broad coverage.</li>
            <li>It may come with restrictions on provider networks or services compared to private insurance but offers significant cost savings, particularly in terms of premiums and out-of-pocket expenses.</li>
          </ul>
        </section>
      </article>
    </Shell>
  );
}

function EmployerSponsoredInsuranceArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article public-health-article employer-sponsored-article">
        <h1>Employer-Sponsored Insurance (ESI)</h1>
        <Para><strong>Employer-Sponsored Insurance (ESI)</strong> refers to health insurance coverage provided to employees by their employer, typically as a benefit or part of an employee benefits package. It is one of the most common forms of health insurance in countries like the U.S. Here’s a full breakdown:</Para>
        <section>
          <h2>Key Features of Employer-Sponsored Insurance (ESI):</h2>
          <ol className="policy-types">
            <li><strong>Eligibility:</strong>
              <ul>
                <li><strong>Full-time employees:</strong> Most employers offer insurance to full-time employees, though some part-time workers may be eligible as well.</li>
                <li><strong>Dependents:</strong> Employers often provide coverage for spouses and children (up to a certain age, like 26 in the U.S.) as part of the plan.</li>
              </ul>
            </li>
            <li><strong>Premiums:</strong>
              <ul>
                <li>The <strong>employer usually pays a significant portion of the premium</strong> (the amount you pay monthly to maintain the insurance), while the employee is responsible for the rest.</li>
                <li>Premiums are often deducted <strong>directly from the employee's paycheck.</strong></li>
                <li>The cost of premiums varies depending on the plan, the level of coverage, and the number of dependents covered.</li>
              </ul>
            </li>
            <li><strong>Coverage:</strong>
              <ul>
                <li>ESI typically covers a range of healthcare services such as:</li>
                <li><strong>Preventive care (e.g., check-ups, vaccinations)</strong></li>
                <li><strong>Emergency services</strong></li>
                <li><strong>Hospitalization</strong></li>
                <li><strong>Prescription drugs</strong></li>
                <li><strong>Mental health services</strong></li>
                <li><strong>Maternity and newborn care</strong></li>
                <li><strong>Rehabilitative services</strong></li>
                <li>Some employers also offer additional benefits like dental, vision, or wellness programs as part of the package.</li>
              </ul>
            </li>
            <li><strong>Plan Options:</strong>
              <ul>
                <li>Employers may offer multiple plans for employees to choose from, including:</li>
                <li><strong>Health Maintenance Organization (HMO):</strong> Requires using in-network providers and getting referrals for specialists.</li>
                <li><strong>Preferred Provider Organization (PPO):</strong> Offers more flexibility in choosing healthcare providers, though out-of-network care is more expensive.</li>
                <li><strong>Exclusive Provider Organization (EPO):</strong> Similar to PPO but with limited or no coverage for out-of-network providers.</li>
                <li><strong>High-Deductible Health Plan (HDHP):</strong> Typically paired with a Health Savings Account (HSA) to help save for medical expenses.</li>
                <li>Employees typically can choose a plan based on their personal healthcare needs and budget.</li>
              </ul>
            </li>
            <li><strong>Employer Contributions:</strong>
              <ul>
                <li>Employers <strong>contribute a portion of the premium</strong>, which can range from 50% to 100% of the employee's premium cost.</li>
                <li>Depending on the company, the employer may also cover a portion of the premiums for dependents, though this is less common.</li>
              </ul>
            </li>
            <li><strong>Tax Advantages:</strong>
              <ul>
                <li>Employees’ contributions to ESI are generally made with pre-tax dollars, reducing taxable income and offering a tax advantage.</li>
                <li>Employers can also deduct the cost of health insurance premiums as a business expense, which helps lower their tax burden.</li>
              </ul>
            </li>
          </ol>
        </section>
        <section>
          <h2>Advantages of Employer-Sponsored Insurance (ESI):</h2>
          <ol>
            <li><strong>Cost Sharing:</strong> One of the biggest benefits is that the employer typically pays a substantial portion of the premium, reducing the financial burden on employees.</li>
            <li><strong>Group Coverage:</strong> Since the plan is purchased through the employer, the employee benefits from group coverage, which is usually cheaper than individual plans.</li>
            <li><strong>Pre-Tax Payments:</strong> Employee contributions to premiums are typically deducted before taxes, reducing taxable income.</li>
            <li><strong>Comprehensive Coverage:</strong> ESI plans are required to meet certain standards under health reform laws (e.g., ACA in the U.S.), ensuring a baseline of benefits.</li>
            <li><strong>Additional Benefits:</strong> Many employers offer wellness programs, dental, vision, and mental health services in addition to regular health coverage.</li>
          </ol>
        </section>
        <section>
          <h2>Disadvantages of Employer-Sponsored Insurance (ESI):</h2>
          <ol>
            <li><strong>Limited Plan Options:</strong> Employees can only choose from the plans offered by their employer, which may not perfectly align with their needs.</li>
            <li><strong>Dependence on Employment:</strong> If you lose your job or become part-time, you may lose your health insurance coverage, although COBRA allows you to continue coverage temporarily.</li>
            <li><strong>Rising Costs:</strong> While the employer often covers part of the premium, employees can still face rising premiums, co-pays, deductibles, and out-of-pocket costs.</li>
            <li><strong>Limited Network:</strong> Many employer-sponsored plans have networks of doctors and healthcare providers. If you prefer a provider outside the network, you may face higher out-of-pocket costs.</li>
          </ol>
        </section>
        <section>
          <h2>Additional Considerations:</h2>
          <ul>
            <li><strong>COBRA:</strong> If you leave your job, you can continue your employer-sponsored health insurance for a limited time (typically 18–36 months), but you may have to pay the full premium plus a small administrative fee.</li>
            <li><strong>Open Enrollment:</strong> Employers typically offer open enrollment periods once a year, during which you can make changes to your plan, add dependents, or switch plans.</li>
          </ul>
        </section>
      </article>
    </Shell>
  );
}

function InternationalHealthInsuranceArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article public-health-article international-health-article">
        <h1>International Health Insurance</h1>
        <Para><strong>International Health Insurance</strong> is a type of health coverage designed for individuals living, working, or traveling abroad for extended periods. It provides comprehensive medical care, including emergency and routine treatments, across multiple countries. Unlike travel insurance, which covers short-term emergencies, international health insurance offers long-term medical support, similar to domestic health plans but with global coverage.</Para>
        <section>
          <h2>Types of International Health Insurance:</h2>
          <ol className="policy-types">
            <li><strong>Individual &amp; Family Plans:</strong>
              <ul><li>Covers individuals and families who live abroad for extended periods.</li></ul>
            </li>
            <li><strong>Corporate/Business Plans:</strong>
              <ul><li>Offered by companies for employees working overseas.</li></ul>
            </li>
            <li><strong>Student Plans:</strong>
              <ul><li>Designed for international students studying abroad.</li></ul>
            </li>
            <li><strong>Retiree Plans:</strong>
              <ul><li>For retirees living in foreign countries.</li></ul>
            </li>
          </ol>
        </section>
        <section>
          <h2>Coverage Inclusions:</h2>
          <ol>
            <li><strong>Inpatient &amp; Outpatient Care:</strong> Hospitalization, surgeries, doctor visits, specialist consultations.</li>
            <li><strong>Maternity &amp; Newborn Care:</strong> Prenatal, delivery, and postnatal care.</li>
            <li><strong>Chronic Disease Management:</strong> Diabetes, hypertension, and long-term illnesses.</li>
            <li><strong>Mental Health Support:</strong> Counseling and psychiatric care.</li>
            <li><strong>Prescription Drugs:</strong> Covers medication costs.</li>
            <li><strong>Dental &amp; Vision (Optional):</strong> Routine and emergency care for teeth and eyes.</li>
            <li><strong>Rehabilitation &amp; Physical Therapy:</strong> Post-surgery and injury recovery.</li>
          </ol>
        </section>
        <section>
          <h2>Exclusions (Varies by Provider):</h2>
          <ul>
            <li>Pre-existing conditions (some plans may cover after a waiting period).</li>
            <li>Elective cosmetic surgery.</li>
            <li>Injuries from extreme sports or risky activities (unless added as a rider).</li>
            <li>War-related injuries and acts of terrorism.</li>
            <li>Self-inflicted harm and substance abuse-related illnesses.</li>
          </ul>
        </section>
        <section className="plan-checklist-section">
          <h2>How to Choose a Plan:</h2>
          <ul className="plan-checklist">
            <li>Check the Network of Hospitals &amp; Clinics.</li>
            <li>Ensure Coverage for the Countries You’ll Visit.</li>
            <li>Compare Costs, Deductibles, and Premiums.</li>
            <li>Look for Emergency Evacuation &amp; Repatriation Benefits.</li>
            <li>Consider Add-Ons Like Dental, Vision, and Maternity.</li>
          </ul>
        </section>
      </article>
    </Shell>
  );
}

function CriticalIllnessInsuranceArticle() {
  return (
    <Shell>
      <article className="detail-page liability-article public-health-article critical-illness-article">
        <h1>Critical Illness Insurance</h1>
        <Para><strong>Critical Illness Insurance</strong> is designed to provide financial support when an individual is diagnosed with a serious illness. Here are some detailed aspects of the coverage:</Para>
        <section>
          <h2>Key Features:</h2>
          <ol className="policy-types">
            <li><strong>Lump Sum Payment:</strong>
              <ul><li>Upon diagnosis of a covered condition, a lump sum amount is paid to the policyholder. This can help with medical bills, lifestyle changes, or other costs.</li></ul>
            </li>
            <li><strong>Covered Illnesses:</strong>
              <ul><li>Common critical illnesses covered include cancer, heart attack, stroke, kidney failure, major organ transplants, multiple sclerosis, and other life-threatening diseases. The exact list of covered conditions may vary by policy.</li></ul>
            </li>
            <li><strong>Policy Terms:</strong>
              <ul><li>The policy might have a waiting period (e.g., 30 days) during which claims are not valid. Some illnesses may have a survival period requirement (e.g., surviving for 30 days after diagnosis).</li></ul>
            </li>
            <li><strong>Customization:</strong>
              <ul><li>You can usually select coverage limits based on your needs. Some policies offer additional benefits like coverage for children, wellness programs, or post-illness recovery assistance.</li></ul>
            </li>
            <li><strong>Payouts and Claims:</strong>
              <ul><li>The lump sum payment can be used for anything, not just medical expenses. This includes lost wages, home care, or even paying off debts.</li></ul>
            </li>
            <li><strong>No Requirement for Treatment to Be Exhausted:</strong>
              <ul><li>Unlike traditional health insurance, critical illness insurance doesn’t require you to use all your medical coverage before you can access the payout. The payout is made directly once the illness is diagnosed.</li></ul>
            </li>
            <li><strong>Renewability:</strong>
              <ul><li>Some policies allow you to renew the coverage, but premiums may rise as you age, and certain illnesses may have a limit on payouts or may not be covered after a certain age.</li></ul>
            </li>
          </ol>
        </section>
        <section>
          <h2>Commonly Covered Conditions:</h2>
          <ol>
            <li><strong>Cancer (usually specific types such as breast, lung, colon, etc.)</strong></li>
            <li><strong>Heart Attack</strong></li>
            <li><strong>Stroke</strong></li>
            <li><strong>Kidney Failure</strong></li>
            <li><strong>Organ Transplant (liver, kidney, etc.)</strong></li>
            <li><strong>Multiple Sclerosis</strong></li>
            <li><strong>Paralysis (due to any covered cause)</strong></li>
          </ol>
        </section>
        <section>
          <h2>Advantages:</h2>
          <ol>
            <li><strong>Financial Protection:</strong> Helps cover costs of illness-related expenses without draining savings.</li>
            <li><strong>Peace of Mind:</strong> Reduces the financial stress of having to focus solely on recovery and treatments.</li>
            <li><strong>Flexibility:</strong> The lump sum payout can be used however the policyholder sees fit.</li>
          </ol>
        </section>
        <section>
          <h2>Disadvantages</h2>
          <ul>
            <li><strong>High Premiums:</strong> Depending on the coverage and the individual’s health, the premiums can be costly.</li>
            <li><strong>Limited Coverage:</strong> Some critical illnesses may not be covered, depending on the policy.</li>
            <li><strong>Age Limitations:</strong> Policies may have age restrictions, and premiums tend to rise as you get older.</li>
          </ul>
        </section>
        <section>
          <h2>How to Choose:</h2>
          <ul>
            <li><strong>Assess Your Risk:</strong> Consider your family’s medical history and lifestyle factors.</li>
            <li><strong>Compare Policies:</strong> Look at the conditions covered, payout amounts, waiting periods, exclusions, and premium costs.</li>
            <li><strong>Check Coverage Amounts:</strong> Ensure the payout amount will be enough to cover your needs in case of a critical illness.</li>
          </ul>
        </section>
      </article>
    </Shell>
  );
}
export function Article({ category }) {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const articles = category === "car" ? carArticles : healthArticles;
  const cleanSlug = (slug || "").replace(/\.html$/i, "").toLowerCase();
  const pathSlug = Object.keys(articles).find((key) => pathname.toLowerCase().includes(`/${key}`));
  const articleSlug = pathSlug || cleanSlug;
  if (!articleSlug || articleSlug === "index") return <HubPage kind={category} />;
  if (category === "car" && articleSlug === "third-party-liability-only-cover") return <ThirdPartyLiabilityArticle />;
  if (category === "car" && articleSlug === "own-damage-cover") return <OwnDamageArticle />;
  if (category === "car" && articleSlug === "personal-accident-cover") return <PersonalAccidentArticle />;
  if (category === "car" && articleSlug === "uninsured-motorist-protection") return <UninsuredMotoristArticle />;
  if (category === "car" && articleSlug === "comprehensive-car-insurance") return <ComprehensiveCarArticle />;
  if (category === "health" && articleSlug === "private-health-insurance") return <PrivateHealthInsuranceArticle />;
  if (category === "health" && articleSlug === "public-health-insurance") return <PublicHealthInsuranceArticle />;
  if (category === "health" && articleSlug === "employer-sponsored-insurance") return <EmployerSponsoredInsuranceArticle />;
  if (category === "health" && articleSlug === "international-health-insurance") return <InternationalHealthInsuranceArticle />;
  if (category === "health" && articleSlug === "critical-illness-insurance") return <CriticalIllnessInsuranceArticle />;
  const data = articles[articleSlug];
  if (!data) return <NotFound />;
  return (
    <Shell>
      <article className="detail-page">
        <h1>{data.title}</h1>
        <Para>
          Insurance can help protect you from eligible financial losses and
          unexpected expenses. Understanding the cover, limits, conditions, and
          exclusions makes it easier to choose a suitable policy.
        </Para>
        {data.sections.map((heading, i) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <Para>
              {i === data.sections.length - 1
                ? "Compare plans carefully, review the policy wording, and confirm current terms with the provider before making a decision."
                : "Coverage varies by provider and location. Common considerations include eligibility, premiums, limits, deductibles, exclusions, claim procedures, and any optional benefits available with the plan."}
            </Para>
            {i === 0 && (
              <ul>
                <li>Review the scope of cover</li>
                <li>Compare limits and exclusions</li>
                <li>Check eligibility and claim requirements</li>
              </ul>
            )}
          </section>
        ))}
      </article>
    </Shell>
  );
}

const faq = [
  "Is the content free to access?",
  "How often do you publish new content?",
  "How do I contact you if I have questions or feedback?",
  "Who is behind the content at FiveMinutes Insights?",
  "Do you have a privacy policy?",
  "Can I share your articles on social media?",
  "Can I contribute to Finvexa?",
];
export function Info() {
  const { page } = useParams();
  const heads = pageMap[page];
  if (!heads) return <NotFound />;
  return (
    <Shell>
      <article className="detail-page info-page">
        {heads.map((h, i) =>
          i === 0 ? (
            <h1 key={h}>{h}</h1>
          ) : (
            <section key={h}>
              <h2>{h}</h2>
              <Para>
                Finvexa provides quick, practical information intended
                for general educational purposes. Please review this section
                carefully and contact us if you have questions.
              </Para>
            </section>
          ),
        )}
        {page === "faq-page" && (
          <div className="faq">
            {faq.map((q, i) => (
              <details key={q} open={i === 0}>
                <summary>
                  {i + 1}. {q}
                </summary>
                <Para>
                  Yes. Our articles are free to read and designed to make useful
                  information accessible in a few minutes.
                </Para>
              </details>
            ))}
          </div>
        )}
      </article>
    </Shell>
  );
}
export function Game() {
  return (
    <Shell ad={false}>
      <div className="game-page">
        <h1>Finvexa HTML5 Game</h1>
        <div className="game-frame">Game area</div>
        <Link className="more-button" to="/">
          Back to Finvexa
        </Link>
      </div>
    </Shell>
  );
}
export function NotFound() {
  return (
    <Shell ad={false}>
      <div className="not-found">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link className="more-button" to="/">
          Return home
        </Link>
      </div>
    </Shell>
  );
}













