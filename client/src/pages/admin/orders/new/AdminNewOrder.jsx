import styles from './adminNewOrder.module.css';
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import SuccessImage from '../../../../shared/assets/state/success.png';
import {createOrderAdmin} from "../../../../actions/admin";
import {productsSearch} from "../../../../actions/products";

const AdminNewOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [createdOrderId, setCreatedOrderId] = useState("");

    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        address: JSON.stringify({ country: "India", state: "", city: "", pincode: "", area: "", street: "" }, null, 2),
        products: JSON.stringify([{ product_id: "", quantity: 1, price: 0 }], null, 2),
        total: "",
        paymentMethod: "CASH"
    });

    const [addressFields, setAddressFields] = useState({
        street: "",
        area: "",
        city: "",
        state: "",
        pincode: "",
        country: "India"
    });

    // Local states for product search autocomplete
    const [productNames, setProductNames] = useState([""]);
    const [searchResults, setSearchResults] = useState([[]]);
    const [focusedRow, setFocusedRow] = useState(null);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            address: JSON.stringify(addressFields, null, 2)
        }));
    }, [addressFields]);

    useEffect(() => {
        try {
            const products = JSON.parse(formData.products);
            const computedTotal = products.reduce((sum, p) => sum + (parseFloat(p.price || 0) * parseInt(p.quantity || 1)), 0);
            setFormData(prev => ({
                ...prev,
                total: computedTotal > 0 ? computedTotal.toFixed(2) : ""
            }));
        } catch (e) {
            // Ignore parse errors
        }
    }, [formData.products]);

    const handleAddressFieldChange = (e) => {
        setAddressFields({ ...addressFields, [e.target.name]: e.target.value });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProductChange = (index, field, value) => {
        const products = JSON.parse(formData.products);
        products[index] = { ...products[index], [field]: value };
        setFormData({ ...formData, products: JSON.stringify(products, null, 2) });
    };

    const handleSearchChange = (index, value) => {
        const names = [...productNames];
        names[index] = value;
        setProductNames(names);

        if (!value.trim()) {
            const results = [...searchResults];
            results[index] = [];
            setSearchResults(results);
            return;
        }

        dispatch(productsSearch(value, 1, (data) => {
            const results = [...searchResults];
            results[index] = data.products || [];
            setSearchResults(results);
        }));
    };

    const selectProduct = (index, product) => {
        const names = [...productNames];
        names[index] = product.name;
        setProductNames(names);

        const products = JSON.parse(formData.products);
        products[index] = {
            product_id: product.id || product.product_id,
            quantity: products[index].quantity,
            price: product.pricing?.selling_price || product.price || 0
        };
        setFormData({ ...formData, products: JSON.stringify(products, null, 2) });

        const results = [...searchResults];
        results[index] = [];
        setSearchResults(results);
        setFocusedRow(null);
    };

    const addProduct = () => {
        const products = JSON.parse(formData.products);
        products.push({ product_id: "", quantity: 1, price: 0 });
        setFormData({ ...formData, products: JSON.stringify(products, null, 2) });
        setProductNames([...productNames, ""]);
        setSearchResults([...searchResults, []]);
    };

    const removeProduct = (index) => {
        const products = JSON.parse(formData.products);
        products.splice(index, 1);
        setFormData({ ...formData, products: JSON.stringify(products, null, 2) });

        const names = [...productNames];
        names.splice(index, 1);
        setProductNames(names);

        const results = [...searchResults];
        results.splice(index, 1);
        setSearchResults(results);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError("");

        const onSuccess = (data) => {
            setLoading(false);
            setSuccess(true);
            setCreatedOrderId(data.order_id);
        };

        const onError = (err) => {
            setLoading(false);
            setError(err.message || "Failed to create order");
        };

        dispatch(createOrderAdmin(formData, onSuccess, onError));
    };

    const handleReset = () => {
        setSuccess(false);
        setCreatedOrderId("");
        setError("");
        setProductNames([""]);
        setSearchResults([[]]);
        setFocusedRow(null);
        setAddressFields({
            street: "",
            area: "",
            city: "",
            state: "",
            pincode: "",
            country: "India"
        });
        setFormData({
            customerName: "",
            customerEmail: "",
            customerPhone: "",
            address: JSON.stringify({ country: "India", state: "", city: "", pincode: "", area: "", street: "" }, null, 2),
            products: JSON.stringify([{ product_id: "", quantity: 1, price: 0 }], null, 2),
            total: "",
            paymentMethod: "CASH"
        });
    };

    if (success) {
        return (
            <div className={styles['wrapper']}>
                <div className={styles['success-wrapper']}>
                    <img src={SuccessImage} alt="Success" />
                    <h2>Order Created Successfully!</h2>
                    <p>Order ID: <strong>{createdOrderId}</strong></p>
                    <p>This 6-digit ID can be used for shipment tracking.</p>
                    <div className={styles['btn-group']}>
                        <div className={'btn1'} onClick={() => navigate('/admin/orders')}>View All Orders</div>
                        <div className={'btn2'} onClick={handleReset}>Create Another</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles['wrapper']}>
            {loading && <Loading text="Creating Order..." overlay={true} />}
            
            <div className={'heading'}>
                <h1>Create New Order</h1>
            </div>

            <div className={styles['info-box']}>
                <strong>Note:</strong> Orders created here will generate a 6-digit ID that customers can use for shipment tracking.
            </div>

            {error && <div className={'error-box'}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles['form']}>
                <div className={styles['section']}>
                    <h3>Customer Details</h3>
                    <div className={styles['field']}>
                        <label>Customer Name *</label>
                        <input type="text" name="customerName" value={formData.customerName} 
                            onChange={handleChange} placeholder="John Doe" required />
                    </div>
                    <div className={styles['field']}>
                        <label>Email</label>
                        <input type="email" name="customerEmail" value={formData.customerEmail} 
                            onChange={handleChange} placeholder="john@example.com" />
                    </div>
                    <div className={styles['field']}>
                        <label>Phone</label>
                        <input type="text" name="customerPhone" value={formData.customerPhone} 
                            onChange={handleChange} placeholder="+91 9876543210" />
                    </div>
                </div>

                <div className={styles['section']}>
                    <h3>Delivery Address</h3>
                    <div className={styles['address-grid']}>
                        <div className={styles['field']}>
                            <label>Street Address *</label>
                            <input type="text" name="street" value={addressFields.street} 
                                onChange={handleAddressFieldChange} placeholder="123 Main St" required />
                        </div>
                        <div className={styles['field']}>
                            <label>Area / Locality *</label>
                            <input type="text" name="area" value={addressFields.area} 
                                onChange={handleAddressFieldChange} placeholder="Sector 4" required />
                        </div>
                        <div className={styles['field']}>
                            <label>City *</label>
                            <input type="text" name="city" value={addressFields.city} 
                                onChange={handleAddressFieldChange} placeholder="Mumbai" required />
                        </div>
                        <div className={styles['field']}>
                            <label>State *</label>
                            <input type="text" name="state" value={addressFields.state} 
                                onChange={handleAddressFieldChange} placeholder="Maharashtra" required />
                        </div>
                        <div className={styles['field']}>
                            <label>Pincode *</label>
                            <input type="text" name="pincode" value={addressFields.pincode} 
                                onChange={handleAddressFieldChange} placeholder="400001" required />
                        </div>
                        <div className={styles['field']}>
                            <label>Country *</label>
                            <input type="text" name="country" value={addressFields.country} 
                                onChange={handleAddressFieldChange} placeholder="India" required />
                        </div>
                    </div>
                </div>

                <div className={styles['section']}>
                    <h3>Products</h3>
                    <div className={styles['products-list']}>
                        {JSON.parse(formData.products).map((product, index) => (
                            <div key={index} className={styles['product-row-wrapper']}>
                                <div className={styles['product-row']}>
                                    <div className={styles['search-field-container']}>
                                        <input type="text" placeholder="Search Product Name..." 
                                            value={productNames[index] || ""}
                                            onChange={(e) => handleSearchChange(index, e.target.value)}
                                            onFocus={() => setFocusedRow(index)} />
                                        
                                        {focusedRow === index && searchResults[index] && searchResults[index].length > 0 && (
                                            <div className={styles['search-dropdown']}>
                                                {searchResults[index].map((item) => (
                                                    <div key={item.id} className={styles['dropdown-item']}
                                                         onClick={() => selectProduct(index, item)}>
                                                        <div className={styles['item-name']}>{item.name}</div>
                                                        <div className={styles['item-meta']}>ID: {item.id} | ₹{item.pricing?.selling_price || item.price}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <input type="number" placeholder="Qty" min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))} />
                                    <input type="number" placeholder="Price" min="0" step="0.01"
                                        value={product.price}
                                        onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))} />
                                    {JSON.parse(formData.products).length > 1 && (
                                        <button type="button" className={styles['remove-btn']} 
                                            onClick={() => removeProduct(index)}>✕</button>
                                    )}
                                </div>
                                {product.product_id && (
                                    <div className={styles['product-id-badge']}>
                                        Selected Product ID: <strong>{product.product_id}</strong>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="button" className={styles['add-btn']} onClick={addProduct}>+ Add Product</button>
                </div>

                <div className={styles['section']}>
                    <h3>Order Details</h3>
                    <div className={styles['field']}>
                        <label>Total Amount (₹) *</label>
                        <input type="number" name="total" value={formData.total} 
                            onChange={handleChange} placeholder="0.00" min="0" step="0.01" required />
                    </div>
                    <div className={styles['field']}>
                        <label>Payment Method</label>
                        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                            <option value="CASH">Cash on Delivery</option>
                            <option value="ONLINE">Online Payment</option>
                        </select>
                    </div>
                </div>

                <div className={styles['actions']}>
                    <button type="button" className={'btn2'} onClick={() => navigate('/admin/orders')}>Cancel</button>
                    <button type="submit" className={'btn1'} style={{ opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Creating...' : 'Create Order'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminNewOrder;
