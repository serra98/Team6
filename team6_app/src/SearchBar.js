import React from "react";
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";

const SearchPage = () => {
  return (
    <MDBCol md="12">
      <MDBFormInline className="md-form mr-auto mb-4">
        <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
        <MDBBtn outline color="warning" rounded size="sm" type="submit" className="mr-auto">
          Search
        </MDBBtn>
      </MDBFormInline>
    </MDBCol>
  );
}

export default SearchPage;