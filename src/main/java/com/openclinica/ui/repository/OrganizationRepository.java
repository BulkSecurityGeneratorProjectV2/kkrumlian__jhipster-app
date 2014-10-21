package com.openclinica.ui.repository;

import com.openclinica.ui.domain.Organization;
        import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Organization entity.
 */
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

}
