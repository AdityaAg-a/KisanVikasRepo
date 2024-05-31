import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  ${StatusBar.currentHeight ? `margin-top: ${StatusBar.currentHeight}px;` : ''}
  background-color: '#E9E7D2';
`;  