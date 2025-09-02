import './RequestForm.css';

function RequestForm() {
  return (
    <form>
      <input type="text" placeholder="Request Title" />
      <textarea placeholder="Description" />
      <input type="number" placeholder="Budget" />
      <button type="submit">Post Request</button>
    </form>
  );
}

export default RequestForm;