import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { actions } from "react-redux-form";
import React, { Component } from "react";
import { connect } from "react-redux";
import DishDetail from "./DishDetail";
import Contact from "./Contact";
import Header from "./Header";
import Footer from "./Footer";
import Menu from "./Menu.js";
import About from "./About";
import Home from "./Home";
import {
  addComment,
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  postFeedback
} from "../redux/ActionCreators";

//

const mapDispatchToProps = dispatch => ({
  //
  addComment: comment => {
    dispatch(addComment(comment));
  },

  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },

  fetchDishes: () => {
    dispatch(fetchDishes());
  },

  fetchComments: () => {
    dispatch(fetchComments());
  },

  fetchPromos: () => {
    dispatch(fetchPromos());
  },

  fetchLeaders: () => {
    dispatch(fetchLeaders());
  },

  postFeedback: () => {
    dispatch(postFeedback());
  },

  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  }
});

//

const mapStoreToProps = state => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
    comments: state.comments
  };
};

//

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
          dishesLoading={this.props.dishes.loading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(promo => promo.featured)[0]
          }
          promoLoading={this.props.promotions.loading}
          promoErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
          leaderLoading={this.props.leaders.loading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              dish => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          loading={this.props.dishes.loading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            comment => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    return (
      <div>
        <Header />

        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route path="/aboutus">
                <About
                  leaders={this.props.leaders.leaders}
                  leadersLoading={this.props.leaders.loading}
                  leadersErrMess={this.props.leaders.errMess}
                />
              </Route>
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus">
                <Contact
                  resetFeedbackForm={this.props.resetFeedbackForm}
                  postFeedback={this.props.postFeedback}
                />
              </Route>
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Main));
