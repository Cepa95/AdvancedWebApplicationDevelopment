import React, { Component } from "react";
import { useParams } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
    };
  }

  componentDidMount() {
    const { subtype } = this.props;
    fetch(`http://demo4497994.mockable.io/vrstePiva/details`)
      .then((response) => response.json())
      .then((data) => {
        const beerDetails = data.details.find((detail) => detail.id === parseInt(subtype));
        this.setState({ details: beerDetails });
      });
  }

  render() {
    const { details } = this.state;
    if (!details) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h2>Details for {details.name}</h2>
        <p><strong>Description:</strong> {details.description}</p>
        <p><strong>Alcohol Content:</strong> {details.alcoholContent}</p>
        <p><strong>Brewery:</strong> {details.brewery}</p>
        <p><strong>Origin:</strong> {details.origin}</p>
        <p><strong>Ingredients:</strong> {details.ingredients ? details.ingredients.join(", ") : "N/A"}</p>
      </div>
    );
  }
}

const WrappedDetails = (props) => {
  const { subtype } = useParams();
  return <Details {...props} subtype={subtype} />;
};

export default WrappedDetails;