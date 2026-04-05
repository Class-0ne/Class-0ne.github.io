---
layout: page
title: Hyundai | Model-Free EV Thermal Management DeePC
description: EV 통합 열관리 시스템을 위한 model-free DeePC 개발 프로젝트.
img: assets/img/project-research.svg
importance: 3
category: graduate
---

## Overview

- **기간**: 2026.04.01 - 2026.11.30
- **발주처**: 현대자동차
- **역할**: 실무책임자

배터리, 모터, 인버터, HVAC가 얽힌 EV 통합 열관리 시스템을 **물리 모델 없이 제어**하는 DeePC 프레임워크를 개발하는 프로젝트입니다. 현재 석사 연구 주제와도 가장 직접적으로 연결된 과제입니다.

## Problem

EV 통합 열관리 시스템은 상태 수가 많고 상호작용이 복잡해, 전통적인 물리 모델 기반 제어기 설계와 튜닝에 시간이 많이 듭니다. 다양한 차종과 운전 조건에 대응 가능한 model-free predictive control 프레임워크가 필요했습니다.

## Approach

- **Simulink/Simscape** 기반 EV 통합 열관리 물리 모델 구성
- DeePC 학습용 입출력 데이터 수집
- **Hankel 행렬 기반 model-free predictive control** 프레임워크 구축
- 다양한 운전 시나리오 및 차종 조건에 대한 성능 검증

## Direct Contribution

- 실무책임자로서 전체 제어 프레임워크 구조 설계
- 통합 열관리 모델 구성과 학습 데이터 수집 흐름 정리
- DeePC 제어기 구현 및 시뮬레이션 검증
- 성능 지표 정의와 계산 시간 검토

## Current Targets

- Cabin 온도 추종 성능 평가 오차 10% 이내
- 배터리/PE 안전 범위 위반율 5% 이내
- DeePC 제어기 평균 연산시간 1초 이내

## Why this project matters

이 프로젝트는 현재 석사 연구 방향과 가장 밀접하게 연결되어 있고, DeePC와 EV thermal management를 동시에 보여주는 대표적인 연구 과제입니다. 향후 이 사이트의 기술적 중심축이 될 페이지로 확장할 예정입니다.
