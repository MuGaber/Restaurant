import { FadeTransform } from "react-animation-components";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./Loading";
import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Fade
} from "reactstrap";

function RenderCard({ item, loading, errMess }) {
  if (loading) {
    return <Loading />;
  } else if (errMess) {
    return <h2>{errMess}</h2>;
  } else {
    return (
      <FadeTransform
        in
        transformProps={{ exitTransfomr: "scale(0.5) translateY(-50%)" }}
      >
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            loading={props.dishesLoading}
            errMess={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            loading={props.promoLoading}
            errMess={props.promoErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            loading={props.leaderLoading}
            errMess={props.leaderErrMess}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
