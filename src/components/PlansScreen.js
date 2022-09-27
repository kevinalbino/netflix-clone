import React, { useEffect, useState } from 'react';
import db, { collection, where, getDocs, query, doc, addDoc, onSnapshot } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import './PlansScreen.css';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        const colRef = collection(db, "customers", user.uid, "subscriptions");

        async function querySnapshots() {
            const querySnapshot = await getDocs(colRef);
            querySnapshot.forEach(async (subscription) => {
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds
                });
            });
        }
        querySnapshots();
    }, [user.uid]);

    useEffect(() => {
        const q = query(collection(db, "products"), where("active", "==", true));

        async function querySnapshots() {
            const querySnapshot = await getDocs(q);
            const products = {};

            querySnapshot.forEach(async (productDoc) => {
                products[productDoc.id] = productDoc.data();

                const colRef = collection(db, "products", productDoc.id, "prices");
                const priceSnap = await getDocs(colRef);

                priceSnap.forEach((price) => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    };
                });
            });
            setProducts(products);
        };
        querySnapshots();
    }, []);

    const loadCheckout = async (priceId) => {
        const docRef = doc(db, "customers", user.uid);
        const colRef = collection(docRef, "checkout_sessions");
        const checkOutRef = await addDoc(colRef, {
            price: priceId,
            success_url: window.location.origin,
            cancel_url: window.location.origin,
        });
        onSnapshot(checkOutRef, async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                alert(`An error occured: ${error.message}`);
            }
            if (sessionId) {
                const stripe = await loadStripe("pk_test_51LjsWyEkveHNWCJgZlXtT8k3wrh003mdPPNJpA0N0Ya3EEvbTlyPGUcTtgCIcqcexJoxhdI28dKsi6O07JUfJlLS00JT16DFLJ");
                stripe.redirectToCheckout({ sessionId });
            }
        });
    };

    return (
        <div className="plansScreen">
            <br />
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}
            {Object.entries(products).map(([productId, productData]) => {
                const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role);
                return (
                    <div className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`} key={productId}>
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                            {isCurrentPackage ? "Current Package" : "Subscribe"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default PlansScreen;