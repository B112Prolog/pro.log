import CT from "../../templates/CT"
import Interview from "../../templates/intereview/Interview"
import Assay from "../../templates/assay/Assay"
import Types from "../../process/steps/Types"
// import  from "../../templates/"

import "./Process.css";

function Body({ page }) {
    switch (page) {
        case 'assay':
            return <Assay />;
        case 'ct':
            return <CT />;
        case 'interview':
            return <Interview />;
        // case 'memo':
        //     return <Memo />;
        default:
            return null;
    }

}

export default function ProcessBody() {
  return (
    <div className="paperBody">
      {/* <div className="paperHeader">
                <Checkbox />
                <RangeDatePicker />
            </div> */}
      <div className="paperContent">
        <Types />
        <Body />
      </div>
    </div>
  );
}
