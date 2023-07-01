import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

function App() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState('');
  const [party, setParty] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/candidates/')
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addCandidate = () => {
    const newCandidate = { name, party };
    axios
      .post('http://localhost:5000/candidates/add', newCandidate)
      .then((res) => {
        console.log(res.data);
        setCandidates([...candidates, newCandidate]);
      })
      .catch((error) => {
        console.log(error);
      });

    setName('');
    setParty('');
  };

  const voteCandidate = (id) => {
    axios
      .put(`http://localhost:5000/candidates/vote/${id}`)
      .then((res) => {
        console.log(res.data);
        const updatedCandidates = candidates.map((candidate) => {
          if (candidate._id === id) {
            return { ...candidate, votes: candidate.votes + 1 };
          }
          return candidate;
        });
        setCandidates(updatedCandidates);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="text-center">
          <h1 className="mb-4">Election Management System</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mb-4">
          <h2>Candidates</h2>
          {candidates.length > 0 ? (
            <ListGroup>
              {candidates.map((candidate) => (
                <ListGroup.Item key={candidate._id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{candidate.name}</h5>
                    <p className="mb-0">{candidate.party}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="mr-2">{candidate.votes}</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="primary" onClick={() => voteCandidate(candidate._id)}>
                      Vote
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No candidates found.</p>
          )}
        </Col>
        <Col md={4}>
          <h2>Add Candidate</h2>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="party">
              <Form.Label>Party</Form.Label>
              <Form.Control
                type="text"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={addCandidate}>
              Add Candidate
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
