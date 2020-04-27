import styled from '@emotion/native';

export const PaperWrapper = styled.View`
  background-color: white;
  padding: 6px 24px 24px 24px;
  border-radius: 12px;
  elevation: 670;
  margin-bottom: 12px;
  flex-direction: row;
`;

export const ExamTitle = styled.Text`
  font-size: 18px;
  font-family: 'NotoSansCJKkr-Black';
`;

export const InfoWrapper = styled.View`
  font-size: 16px;
  flex-direction: row;
`;

export const InfoKey = styled.Text`
  color: #AAAAAA;
  margin-right: 6px;
`;

export const PaperMainInfo = styled.View`
  flex: 1;
`;

export const PandaWrapper = styled.View`
  width: 200px;
  height: 400px;
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const EmptyWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const QuestionQuantityBadge = styled.Text`
  font-family: 'NotoSansCJKkr-Black';
  margin-top: 18px;
  background-color: #F4F9EE;
  color: #62A436;
  height: 60px;
  width: 60px;
  padding: 5px;
  text-align: center;
  border-radius: 60px;
  text-align-vertical: center;
`;

export const NoWorkpaper = styled.Text`
  font-family: 'NotoSansCJKkr-Black';
  opacity: 0.7;
`;

export const LeftDate = styled.Text`
  margin-bottom: 12px;
  opacity: 0.4;
  margin-top: 18px;
`;