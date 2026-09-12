---
layout: page
title: Personalized Regenerative Braking Control
company: Hyundai
description: 운전자 선호와 개입 가능성을 함께 고려한 개인화 회생제동 제어 연구.
importance: 2
category: graduate
tags: [MPC, Regenerative Braking, CarMaker]
---

## Overview

- **과제명**: 도심주행에서 에너지 고효율 모션 제어를 위한 주행 최적화 및 실적용성 향상 기술 개발
- **기간**: 2025.07.15 ~ 2026.07.14
- **발주처**: 현대자동차
- **역할**: 참여 연구원

도심주행 조건에서 에너지 회수를 극대화하면서도 운전자 개입을 최소화하는 개인화 회생제동 제어기를 설계하는 프로젝트입니다.

## Key Results

### HILS

정지 시나리오 CarMaker HILS 평가에서 에너지 회수 중심 기존 제어기 대비 **운전자 개입률을 최대 50.0%p 감소**시키고, **순 회수 에너지를 9.78% 향상**했습니다.

### Real Vehicle

MABX 기반 실차 시험에서 통합 제어 로직을 적용하고, 주행 데이터 수집과 GPR 온라인 갱신 흐름을 확인했습니다. 위 정량 성과는 HILS 평가 기준입니다.

## Problem

기존 자동 회생제동 로직은 에너지 회수 극대화에만 초점을 맞추고 있어, 운전자의 실제 제동 성향을 충분히 반영하지 못하는 한계가 있었습니다. 자동 회생제동이 운전자의 기대보다 이르게 또는 강하게 작동하면 운전자는 가속 페달(APS)로 개입하게 되고, 제어기가 의도한 회생에너지 회수 기회를 놓치게 됩니다. 결국 에너지 효율 중심 제어가 오히려 실적용성을 떨어뜨리는 결과를 낳습니다.

이 문제를 단순 제동 성능 문제가 아니라, **운전자 개입 가능성과 회수 에너지의 trade-off를 함께 다뤄야 하는 문제**로 재정의했습니다.

## Approach

운전자 성향을 하나의 지표로 단순화하지 않고 두 가지 분포로 분리하여 모델링했습니다.

- **운전자 선호 분포 (BPS 기반)**: 자동 제동이 없는 상황에서 운전자가 직접 브레이크를 밟아 정지하는 제동 거리 분포
- **운전자 개입 분포 (APS 기반)**: 자동 회생제동이 활성화된 상황에서 운전자가 가속 페달로 개입하고 정지하는 거리 분포

두 분포를 각각 **GPR (Gaussian Process Regression)** 으로 모델링했습니다. 데이터가 많지 않은 조건에서도 적용 가능하고, 분포의 불확실성까지 함께 반영할 수 있기 때문입니다. 입력은 현재 차량 속도, 출력은 각 조건에서의 제동 거리입니다.

생성된 GP 테이블은 속도별 선호·개입 거리의 예측 평균과 불확실성을 포함하며, 제어기가 감속 거리를 결정하는 기준으로 사용했습니다. 정지 및 과속 카메라 시나리오에서는 운전자 개입 가능성과 회수 에너지를 비교해 감속 거리를 결정하고, 최적 제어 문제를 풀어 제동 프로파일을 생성했습니다. 선행차 대응 로직은 동료가 개발한 모듈과 통합해 검증했습니다.

## Direct Contribution

- 주행 데이터 전처리 및 GPR 기반 속도별 선호·개입 거리 GP 테이블 생성 코드 구현
- GP 테이블에 예측 평균과 불확실성을 담아 제어 기준으로 활용
- 정지 및 과속 카메라 시나리오에서 운전자 개입 가능성과 회수 에너지를 고려해 감속 거리 결정
- 최적 제어 문제를 풀어 제동 프로파일 생성
- CarMaker HILS 환경과 제어 로직 연계 및 검증
- 직접 개발한 과속 카메라 로직과 동료의 선행차 대응 로직 통합
- MABX 기반 실차 시험, 주행 데이터 수집 및 GPR 온라인 갱신 확인

## Outputs

- [IFAC World Congress 2026](https://ifac.papercept.net/conferences/conferences/IFAC26/program/IFAC26_ContentListWeb_2.html) 논문 발표 — *Personalized Energy-Aware Regenerative Braking Control Minimizing Driver Interventions* (accepted)
- Interactive Application Paper Prize 최종 6편 후보 선정 ([VOICE Lab publication list](https://sites.google.com/view/voice-lab/publications/international-conference))
- CarMaker/Simulink 기반 시나리오별 제동 성능 및 운전자 개입 분석 결과
- MABX 기반 실차 시험 데이터 및 GPR 온라인 갱신 확인 결과
