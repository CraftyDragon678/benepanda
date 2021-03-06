import React, { useState, useEffect, useRef } from 'react';
import {
  Text, TouchableNativeFeedback, SectionList, Dimensions, BackHandler, Image,
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import moment from 'moment';
import useDimensions from '@rnhooks/dimensions';
import 'moment/locale/ko';

import PageWithTitle from 'templetes/PageWithTitle';
import { BriefPaper } from 'types/paper';
import getPapers from 'functions/benedu/getPapersList';
import {
  EmptyWrapper, InfoKey, PaperWrapper, PaperTitle, InfoWrapper,
  LeftDate, NoPaper, PaperMainInfo, QuestionQuantityBadge,
  BottomSheetWrapper, Panda,
} from './styleds';
import DownloadModal from './DownloadModal';

export default (): JSX.Element => {
  const [papers, setPapers] = useState<BriefPaper[] | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = useDimensions('window');
  const maxHeight = Math.max(width, height);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedPaper, selectPaper] = useState<{
    title: string;
    paperId: string;
  }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bottomSheetRef = useRef<any>();
  const sortedPapers = papers?.reduce((acc: {
    [key: string]: BriefPaper[];
  }, paper) => {
    const key = paper.endedAt.fromNow();
    if (acc[key]) acc[key] = [...acc[key], paper];
    else acc[key] = [paper];
    return acc;
  }, {});
  useEffect(() => {
    moment.locale('ko');
    (async (): Promise<void> => {
      setPapers(await getPapers());
    })();
  }, []);
  useEffect(() => {
    function closeModal(): boolean {
      if (isModalOpened) {
        bottomSheetRef.current.snapTo(1);
        bottomSheetRef.current.snapTo(1);
        return true;
      }
      return false;
    }
    BackHandler.addEventListener('hardwareBackPress', closeModal);
    return (): void => BackHandler.removeEventListener('hardwareBackPress', closeModal);
  }, [isModalOpened]);
  useEffect(() => {
    getPapers().then((updatedPapers) => {
      setPapers(updatedPapers);
      setRefreshing(false);
    });
  }, [refreshing]);
  if (papers === null) return (<PageWithTitle titleText="밀린 과제"><></></PageWithTitle>);
  return (
    <>
      <PageWithTitle titleText={`밀린 과제 ${papers.length}개`}>
        {papers.length !== 0 ? (
          sortedPapers && (
          <SectionList
            sections={Object.keys(sortedPapers).map((key) => ({
              title: key,
              data: sortedPapers[key],
            })).sort((a, b) => a.data[0].endedAt.valueOf() - b.data[0].endedAt.valueOf())}
            keyExtractor={(paper): string => paper.paperTitle}
            renderSectionHeader={
              ({ section: { title } }): JSX.Element => <LeftDate>{title}</LeftDate>
            }
            refreshing={refreshing}
            onRefresh={(): void => setRefreshing(true)}
            renderItem={({ item: paper }): JSX.Element => (
              <TouchableNativeFeedback
                key={paper.paperTitle}
                onPress={(): void => {
                  selectPaper({
                    paperId: paper.paperId,
                    title: paper.paperTitle,
                  });
                  bottomSheetRef.current.snapTo(0);
                  bottomSheetRef.current.snapTo(0);
                }}
              >
                <PaperWrapper>
                  <PaperMainInfo>
                    <PaperTitle>{paper.paperTitle}</PaperTitle>
                    <InfoWrapper>
                      <InfoKey>과목</InfoKey>
                      <Text>{paper.subject}</Text>
                    </InfoWrapper>
                    <InfoWrapper>
                      <InfoKey>출제자</InfoKey>
                      <Text>{paper.register}</Text>
                    </InfoWrapper>
                    <InfoWrapper>
                      <InfoKey>시작일</InfoKey>
                      <Text>{(paper.startedAt?.format('M월 D일'))}</Text>
                    </InfoWrapper>
                  </PaperMainInfo>
                  <QuestionQuantityBadge>
                    {paper.questionQuantity}
                    문제
                  </QuestionQuantityBadge>
                </PaperWrapper>
              </TouchableNativeFeedback>
            )}
          />
          )
        ) : (
          <EmptyWrapper>
            <Panda resizeMode="center" source={require('assets/panda.png')} />
            <NoPaper>과제가 없어요!</NoPaper>
          </EmptyWrapper>
        )}
      </PageWithTitle>
      <BottomSheet
        snapPoints={[maxHeight, 0]}
        initialSnap={1}
        ref={bottomSheetRef}
        enabledContentGestureInteraction
        onOpenStart={(): void => setIsModalOpened(() => true)}
        onCloseEnd={(): void => setIsModalOpened(() => false)}
        renderContent={(): JSX.Element => (
          <BottomSheetWrapper>
            {selectedPaper && <DownloadModal paper={selectedPaper} />}
          </BottomSheetWrapper>
        )}
      />
    </>
  );
};
