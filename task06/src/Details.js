import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import Modal from "./Modal";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      showModal: false
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

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  render() {
    const { details, showModal } = this.state;
    if (!details) {
      return <div>Loading...</div>;
    }

    return (
      <CartContext.Consumer>
        {({ addToCart }) => (
          <div>
            <h2>Details for {details.name}</h2>
            <p><strong>Description:</strong> {details.description}</p>
            <p><strong>Alcohol Content:</strong> {details.alcoholContent}</p>
            <p><strong>Brewery:</strong> {details.brewery}</p>
            <p><strong>Origin:</strong> {details.origin}</p>
            <p><strong>Ingredients:</strong> {details.ingredients ? details.ingredients.join(", ") : "N/A"}</p>

            <button onClick={() => { addToCart({ id: details.id, name: details.name }); this.toggleModal(); }}> 
              Add product
            </button>

            {showModal ? (
              <Modal>
                <div>
                  <h1>Product is added. See basket?</h1>
                  <div>
                    <Link to={`/cart`}>
                      <button>Yes</button>
                    </Link>
                    <button onClick={this.toggleModal}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </CartContext.Consumer>
    );
  }
}

const WrappedDetails = (props) => {
  const { subtype } = useParams();
  return <Details {...props} subtype={subtype} />;
};

export default WrappedDetails;