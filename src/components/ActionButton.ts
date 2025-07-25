import styled from "styled-components";

export const ActionButton = styled.button`
  background-color: #2b74e4;
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #155fce;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }
`;