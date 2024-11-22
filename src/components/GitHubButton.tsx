import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ButtonContainer = styled.a`
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: #fff;
  text-decoration: none;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  font-size: 0.85rem;
  z-index: 100;
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 768px) {
    position: absolute;
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  &:hover {
    background: rgba(251, 255, 58, 0.1);
    border-color: #FBFF3A;
    color: #FBFF3A;
    transform: translateY(-2px);
  }

  &:hover svg {
    fill: #FBFF3A;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: #fff;
    transition: fill 0.2s ease;

    @media (min-width: 768px) {
      width: 24px;
      height: 24px;
    }
  }
`;

export const GitHubButton = () => {
  return (
    <ButtonContainer 
      href="https://github.com/SwiftStrike24/DBR-Countdown"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="View source on GitHub"
    >
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
      </svg>
      GitHub
    </ButtonContainer>
  );
}; 