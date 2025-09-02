import RequestForm from "../RequestForm/RequestForm";

function RequestList({ requests, users, currentUser }) {
  return (
    <section className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold">Photography Requests</h2>
      {currentUser.role === 'Customer' && <RequestForm />}
      {requests.map(request => (
        <article key={request.id}>
          <h3>{request.title}</h3>
          <p>{request.description}</p>
        </article>
      ))}
    </section>
  );
}

export default RequestList;