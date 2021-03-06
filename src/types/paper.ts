import Moment from 'moment';

export type Subject = |'전체'|'국어'|'수학'|'영어'|'한국사'|'물리1'|'화학1'|'통합과학'|'공업일반'|'기초제도'|'회계원리'|'상업경제'|'통합사회'

export type BriefPaper = {
    paperTitle: string;
    subject: Subject;
    register: string;
    questionQuantity: number;
    endedAt: Moment.Moment;
    originYear?: number;
    originFrom?: string;
    startedAt: Moment.Moment;
    paperId: string;
    rightQuantity?: number;
}

export type Paper = {
    Table01: {
      IBT_ID: number;
      IBQ_NUM: number;
      IBQ_ID: number;
      BOOK_ID: null| number;
      BLT_ID: null| number;
      QST_ID: number;
      QST_CORR_RATE: null|number;
      QST_P_START: number;
      QST_P_END: number;
      QST_CMT_P_START: number;
      QST_CMT_P_END: number;

      ATT_ALREADY_REG_YN: string;
      EXE_CMT_HTML: null| string;
      EXE_RANGE: string;
      CTG_STEP1_CODE: null|string;
      CTG_STEP1_NAME: null|string;
      CTG_STEP2_CODE: null|string;
      CTG_STEP2_NAME: null|string;
      QST_P_TAG: string;
      QST_CMT_P_TAG: string;
      QST_HTML: string;
      QST_CMT_HTML: string;
      QST_CORRECT: string;

      EXE_ID: null | number;
      EXE_HTML: null | string;
      EXM_ID: null | number;
      IBU_STATUS: null | string;
      ITT_ANSWER: null | string;
      ITT_CORR_YN: null | string;
      QST_SOURCE: null | string;
      QST_TAG: null | string;
      QST_TAG2: null | string;
      TMH_MOVIE_SRC: null | string;
    }[];
    Table02: {
      IBT_ID: number;
      IBT_TYPE: any;
      IBT_NAME: string;
      SBJ_CODE: string;
      SBJ_NAME: string;
    }[];
    Table03: [
      {
        RESULT_CODE: string;
        RESULT_NAME: string;
      }
    ];
    UserName: string;
    IBT_PRINT_TYPE: string;
  };

export type renderedPDF ={
    pdf: string;
    thumbnail: string;
  }
