import { Link } from "react-router-dom"

export default function JoiningGuide({ member = false }: { member?: boolean }) {
  return (
    <div className="experience-joining-guide">
      <p>
        {member
          ? "Use this form to express interest in membership. It is an enquiry, not confirmation of membership or appointment to the board. The team will explain the appropriate process and any requirements."
          : "Tell us about your interests, skills and location. The team will discuss suitable opportunities and availability with you before you commit to an activity."}
      </p>
      <ol>
        <li>
          <strong>1. Introduce yourself</strong>
          <span>
            {member
              ? "Share how you would like to contribute. Optional details can be left blank."
              : "Share how you would like to contribute and complete all the fields below."}
          </span>
        </li>
        <li>
          <strong>2. Talk with the team</strong>
          <span>
            We will review your enquiry and follow up using your contact
            details.
          </span>
        </li>
        <li>
          <strong>3. Agree the next step</strong>
          <span>
            {member
              ? "Discuss the membership process and the role you are interested in."
              : "Discuss the role, time commitment and any preparation before taking part."}
          </span>
        </li>
      </ol>
      {member ? <p className="text-sm">
        {member
          ? "Looking for hands-on community work?"
          : "Interested in organisational membership?"}{" "}
        <Link
          className="underline"
          to={member ? "/become-a-volunteer" : "/become-a-member"}
        >
          {member ? "Explore volunteering" : "Enquire about membership"}
        </Link>
        .
      </p> : (
        <aside className="experience-membership-cta" aria-labelledby="membership-cta-title">
          <div>
            <h3 id="membership-cta-title">Interested in becoming a member?</h3>
            <p>Explore another way to support Ochaworth’s mission. Ask our team about membership and how you can contribute.</p>
          </div>
          <Link className="experience-button" to="/become-a-member">Enquire about membership <span aria-hidden="true">↗</span></Link>
        </aside>
      )}
    </div>
  )
}
