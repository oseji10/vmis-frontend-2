import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const OurLogo = () => {
  return (
    <LinkStyled href="/">
      <Image 
        src="/images/logos/ResilienceLogo.png" 
        alt="logo" 
        width={180} 
        height={70} 
        priority 
      />
    </LinkStyled>
  );
};

export default OurLogo;
